# Configuration #
The `$server` array holds all the Slave and Master database authentication tokens.

## `$server` Variable ##
`$server[numeric-index]` is an associative array listed as below
  * `slave_name`: A display name of the Slave Server
  * `slave_host`: Host name of the Server, could be the IP address
  * `slave_username`: The `super` privileged username, normally the `root`
  * `slave_password`: Password of the `super` privileged username
  * `slave_port`: Port number of the Slave Server, by default its value is `3306`

A similar naming convention is followed for the master server as
  * `master_host`
  * `master_username`
  * `master_password`
  * `master_port`

## Adding Slave-Master Configuration ##
While adding more combinations, paste the following code above the `?>` line.
```
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
```

Update the values accordingly.