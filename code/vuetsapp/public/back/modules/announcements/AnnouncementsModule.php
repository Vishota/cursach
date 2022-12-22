<?php
    class AnnouncementsModule {
        static function getFromQuery(string $query, string $param, string $type) {
            preg_match("/$param=(?P<$param>$type+)/", $query, $matched);
            return (isset($matched[$param]) ? $matched[$param] : null);
        }
        static function makeWhereStatement(array $conditions) : string {
            $statement = '';
            foreach ($conditions as $condition) {
                $statement .= "$condition AND ";
            }
            return mb_strcut($statement, 0, -5);
        }
        static function queryToRequest(string $query) : array {
            $conditions = [];
            $params = [];
            
            $text = self::getFromQuery($query, 'text', '[^\|]');
            if($text !== null) {
                array_push($conditions, 'MATCH (title, description) AGAINST :text');
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
            return [
                'statement' => self::makeWhereStatement($conditions),
                'params' => $params
            ];
            //return " WHERE price >= $pricemin AND price <= $pricemax";
        }
       /* function search(string $) {

        }*/
        function __construct() {
            
        }
    }
    var_dump(AnnouncementsModule::queryToRequest('text=а b c|pricemin=1|pricemax=100'));