# Create database dump

# mysqldump /*database_name*/ -u root -p > /*filename*/
mysqldump waisda -u root -p > backup_waisda.sql

# Restore database from database dump
create database waisda charset utf8 collate utf8_general_ci;
mysql waisda -u root -p  < backup_waisda.sql

#_________________________________________________

# Create new user and grant rights
# create user /*'username'*/@/*'database_host'*/ identified by /*'user_password'*/;

# Grant rights to user
# grant /*rights*/ /*database_name*/.* to /*'username'*/@/*'database_host'*/;
grant select on waisda.* to 'test_waisda'@'localhost';
grant execute on waisda.* to 'test_waisda'@'localhost';

# Check rights
# show grants for /*'username'*/@/*'database_host'*/;
show grants for 'test_waisda'@'localhost';

#_________________________________________________
