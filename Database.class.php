<?

class Database
{
    protected $db = array('mysql:host=localhost;dbname=test_db', 'root', 'roottest853');

    function db_select($query, $data)
    {
        $db = new PDO($this->db[0], $this->db[1], $this->db[2]);
        $asd = $db->prepare($query);
        $asd->execute($data);
        $result = $asd->fetchAll();
        $db = null;
        return $result;
    }

    function db_select_array($query, $data)
    {
        $db = new PDO($this->db[0], $this->db[1], $this->db[2]);
        $asd = $db->prepare($query);
        for ($a = 0; $a < count($data); $a++) {
            $asd->execute($data[$a]);
        }
        $result = $asd->fetchAll();
        $db = null;
        return $result;
    }

    function db_exec($query, $data)
    {
        $db = new PDO($this->db[0], $this->db[1], $this->db[2]);
        $asd = $db->prepare($query);
        $asd->execute($data);
        $id = $db->lastInsertId();
        $db = null;
        return $id;
    }

    function db_exec_array($query, $data)
    {
        $db = new PDO($this->db[0], $this->db[1], $this->db[2]);
        $asd = $db->prepare($query);
        for ($a = 0; $a < count($data); $a++) {
            $asd->execute($data[$a]);
        }
        $id = $db->lastInsertId();
        $db = null;
        return $id;
    }
}


?>