<?php
    require_once __DIR__.'/../../common/singleton/SingletonTrait.php';
    require_once __DIR__.'/../../main/CursachDatabase.php';

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
            $conditions = [];
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


        function search(string $query) {
            $request = $this->queryToRequest($query);
            //var_dump($request);
            $requestResult = CursachDatabase::getInstance()->request($request['statement'], $request['params'])->response();
            $ids = [];
            foreach ($requestResult as $key => $value) {
                array_push($ids, $value['id']);
            }
            return $ids;
        }
        function getTitle(int $id) : string {
            return CursachDatabase::getInstance()
                ->request('SELECT title FROM announcements WHERE id=?', [$id])
                ->response()[0]['title'];
        }
        function getDescription(int $id) : string {
            return CursachDatabase::getInstance()
                ->request('SELECT description FROM announcements WHERE id=?', [$id])
                ->response()[0]['description'];
        }
        function getFeatures(int $id) : string {
            return CursachDatabase::getInstance()
                ->request('SELECT features FROM announcements WHERE id=?', [$id])
                ->response()[0]['features'];
        }
        function getPics(int $id) : string {
            return CursachDatabase::getInstance()
                ->request('SELECT pictures FROM announcements WHERE id=?', [$id])
                ->response()[0]['pictures'];
        }
        function getPrice(int $id) : string {
            return CursachDatabase::getInstance()
                ->request('SELECT price FROM announcements WHERE id=?', [$id])
                ->response()[0]['price'];
        }
    }