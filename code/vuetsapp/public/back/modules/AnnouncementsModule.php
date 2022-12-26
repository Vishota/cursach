<?php
    require_once __DIR__.'/../common/singleton/SingletonTrait.php';
    require_once __DIR__.'/../main/CursachDatabase.php';
    require_once __DIR__.'/UsersModule.php';

    class AnnouncementsModule {
        use SingletonTrait;

        // method that gets value from query
        private function getFromQuery(string $query, string $param, string $type) {
            preg_match("/$param=(?P<$param>$type+)/", $query, $matched);
            return (isset($matched[$param]) ? $matched[$param] : null);
        }
        // method that makes connects statements with AND
        private function makeWhereStatement(array $conditions) : string {
            $statement = '';
            foreach ($conditions as $condition) {
                $statement .= "$condition AND ";
            }
            return mb_strcut($statement, 0, -5);
        }
        // method that transforms client query to database request
        private function queryToRequest(string $query) : array {
            $conditions = ['status != "DELETED"'];
            $params = [];
            
            $text = self::getFromQuery($query, 'text', '[^\|]');
            if($text !== null) {
                array_push($conditions, 'MATCH (title, description) AGAINST (:text)');
                $params['text'] = $text;
            }
            $pricemin = self::getFromQuery($query, 'pricemin', '\d');
            if($pricemin !== null) {
                array_push($conditions, 'price >= :pricemin');
                $params['pricemin'] = $pricemin;
            }
            $pricemax = self::getFromQuery($query, 'pricemax', '\d');
            if($pricemax !== null) {
                array_push($conditions, 'price <= :pricemax');
                $params['pricemax'] = $pricemax;
            }
            $owner = self::getFromQuery($query, 'owner', '\d');
            if($owner !== null) {
                array_push($conditions, 'owner_id = :owner');
                $params['owner'] = $owner;
            }
            $limit = self::getFromQuery($query, 'limit', '\d');
            if($limit !== null) {
                array_push($conditions, 'limit = :limit');
                $params['limit'] = $limit;
            }
            $sort = self::getFromQuery($query, 'sort', '\d');
            switch($sort) {
                case 'recent': $sort = 'ORDER BY created DESC'; break;
                case 'priceasc': $sort = 'ORDER BY price ASC'; break;
                case 'pricedesc': $sort = 'ORDER BY price DESC'; break;
                case 'relevance':default:  $sort = 'ORDER BY relevance DESC'; break;
            }
            $select = 'SELECT id' . ($text ? ', MATCH (title, description) AGAINST (:text) AS relevance' : ', created AS relevance') . ' FROM announcements';
            $whereStatement = self::makeWhereStatement($conditions);
            if($whereStatement != '') $whereStatement = 'WHERE ' . $whereStatement;
            return [
                'statement' => "$select $whereStatement $sort",
                'params' => $params
            ];
        }

        /**
         * in:
         *  query
         * out:
         *  array of ids
         */
        function search(string $query) {
            $request = $this->queryToRequest($query);
            $requestResult = CursachDatabase::getInstance()->request($request['statement'], $request['params'])->response();
            $ids = [];
            foreach ($requestResult as $key => $value) {
                array_push($ids, $value['id']);
            }
            return $ids;
        }
        /**
         * in:
         *  array of columns to select
         * out:
         *  array of selected columns / false
         */
        function getInfo(int $id, array $columns) : array {
            if(!$this->canIGet($id)) return false;
            $allowed = ['id', 'owner_id', 'title', 'description', 'price', 'created', 'features', 'pictures', 'status'];
            $columns = array_intersect($columns, $allowed);
            $columnsString = '';
            foreach ($columns as $column) {
                $columnsString .= $column.',';
            }
            $columnsString = substr($columnsString, 0, -1);
            return CursachDatabase::getInstance()
                ->request("SELECT $columnsString FROM announcements WHERE id=?", [$id])
                ->response()[0];
        }
        /**
         * in:
         *  id
         * out:
         *  string description / false
         */

        function addAnnouncement(string $title, string $description, int $price, string $featuresJson, string $picturesJson) {
            if(!$this->canIAdd()) return false;
            $price = max(0, $price);
            $me = UsersModule::getInstance()->getMyId();
            return CursachDatabase::getInstance()->request(
                'INSERT INTO `announcements` (`id`, `owner_id`, `title`, `description`, `price`, `created`, `features`, `pictures`)
                VALUES (NULL, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?)',
                [$me, $title, $description, $price, $featuresJson, $picturesJson])
                    ->lastInsertId();
        }
        function editAnnouncement(int $id, string $title, string $description, int $price, string $featuresJson, string $picturesJson) : bool {
            if(!$this->canIEdit($id)) return false;
            $price = max(0, $price);
            if(CursachDatabase::getInstance()
                ->request('UPDATE `announcements` SET `title`=?, `description`=?,`price`=?,`features`=?,`pictures`=? WHERE `announcements`.`id` = ?;',
                [$title, $description, $price, $featuresJson, $picturesJson, $id])
                ->rowCount() == 0 ) return false;
            return true;
        }
        function deleteAnnouncement(int $id) : bool {
            if(!$this->canIDelete($id)) return false;
            if(CursachDatabase::getInstance()
                ->request('UPDATE `announcements` SET `status`="DELETED" WHERE `announcements`.`id` = ?;', [$id])
                ->rowCount() == 0 ) return false;
            return true;
        }

        public function amIOwner(int $announcementId) {
            return $this->getInfo($announcementId, ['owner_id'])['owner_id'] === UsersModule::getInstance()->getMyId();
        }
        public function canIEdit($announcementId) : bool {
            return $this->amIOwner($announcementId);
        }
        public function canIDelete($announcementId) : bool {
            return $this->amIOwner($announcementId) || UsersModule::getInstance()->amIModerator();
        }
        public function canIGet($announcementId) : bool {
            return CursachDatabase::getInstance()
                ->request("SELECT status FROM announcements WHERE id=?", [$announcementId])
                ->response()[0] !== 'DELETED' &&
                UsersModule::getInstance()->getMyStatus() !== 'BLOCKED';
        }
        public function canIAdd() : bool {
            return UsersModule::getInstance()->getMyStatus() === 'ACTIVE';
        }
    }