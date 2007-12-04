<?php
error_reporting(0);

// All slave sevrers

$iss=0;
$server[$iss]['slave_name'] = 'My Local Server';
$server[$iss]['slave_host'] = '127.0.0.1';
$server[$iss]['slave_username'] = 'root';
$server[$iss]['slave_password'] = 'mysql';
$server[$iss]['slave_port'] = 3306;
$server[$iss]['master_host'] = '127.0.0.1';
$server[$iss]['master_username'] = 'root';
$server[$iss]['master_password'] = 'mysql';
$server[$iss]['master_port'] = 3307;

$iss++;
$server[$iss]['slave_name'] = 'Slave Host 17';
$server[$iss]['slave_host'] = '172.16.208.60';
$server[$iss]['slave_username'] = 'root';
$server[$iss]['slave_password'] = '<rootpassword>';
$server[$iss]['slave_port'] = 3307;
$server[$iss]['master_host'] = '172.16.208.60';
$server[$iss]['master_username'] = 'root';
$server[$iss]['master_password'] = '<rootpassword>';
$server[$iss]['master_port'] = 3306;

?>
