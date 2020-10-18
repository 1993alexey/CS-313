<?php
function get_db() {
	$db = NULL;

	try {
		$dbUrl = getenv('DATABASE_URL');
		if (!isset($dbUrl) || empty($dbUrl)) 
			$dbUrl = "postgres://fxbmoruwbznmdb:a1082de5d135a79b1ee7c1e2e897fdf21f516a12fdc10a632f8263cd023304d5@ec2-52-20-160-44.compute-1.amazonaws.com:5432/dbimaf53at67b5";
		
		$dbopts = parse_url($dbUrl);
		$dbHost = $dbopts["host"];
		$dbPort = $dbopts["port"];
		$dbUser = $dbopts["user"];
		$dbPassword = $dbopts["pass"];
		$dbName = ltrim($dbopts["path"],'/');

		$db = new PDO("pgsql:host=$dbHost;port=$dbPort;dbname=$dbName", $dbUser, $dbPassword);
		$db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
	}
	catch (PDOException $ex) {
		echo "Error connecting to DB. Details: $ex";
		die();
	}

	return $db;
}