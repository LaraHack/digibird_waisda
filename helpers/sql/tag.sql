# Get total number of tags

# USE /*database_name*/;
USE waisda;

DELIMITER //
DROP FUNCTION IF EXISTS `sf_no_tags`;

CREATE FUNCTION `sf_no_tags`()
RETURNS INT
COMMENT 'Stored function to get the total number of tags in the database'
BEGIN
	DECLARE no_tags INT DEFAULT 0;
	SELECT COUNT(tag) INTO no_tags FROM TagEntry;
	RETURN no_tags;
END //
DELIMITER ;

# Grant execution rights for the function:
# GRANT EXECUTE ON FUNCTION /*database_name*/.sf_no_tags TO /*'username'*/@/*'database_host'*/;
# GRANT EXECUTE ON FUNCTION waisda.sf_no_tags TO /*'username'*/@'localhost';

# Call stored function:
# SELECT waisda.sf_no_tags();

#_________________________________________________

# Get total number of unique tags

# USE /*database_name*/;
USE waisda;

DELIMITER //
DROP FUNCTION IF EXISTS `sf_unique_no_tags`;

CREATE FUNCTION `sf_unique_no_tags`()
RETURNS INT
COMMENT 'Stored function to get the total number of unique tags in the database'
BEGIN
	DECLARE no_unique_tags INT DEFAULT 0;
	SELECT COUNT(DISTINCT tag) INTO no_unique_tags FROM TagEntry;
	RETURN no_unique_tags;
END //
DELIMITER ;

# Grant execution rights for the function:
# GRANT EXECUTE ON FUNCTION /*database_name*/.sf_no_tags TO /*'username'*/@/*'database_host'*/;
# GRANT EXECUTE ON FUNCTION waisda.sf_unique_no_tags TO /*'username'*/@'localhost';

# Call stored function:
# SELECT waisda.sf_unique_no_tags();

#_________________________________________________
