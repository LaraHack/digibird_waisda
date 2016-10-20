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
COMMENT 'Stored function to get the total number of unique tags'
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

# Get tags with a certain text in them

# USE /*database_name*/;
USE waisda;

DELIMITER //
DROP PROCEDURE IF EXISTS `sp_get_LIKE_tags`;

CREATE PROCEDURE `sp_get_LIKE_tags`(IN p_tag VARCHAR(255))
COMMENT 'Get tags that contain certain text'
BEGIN
	SELECT * FROM TagEntry
	WHERE TagEntry.tag LIKE CONCAT('%', p_tag, '%');
END //
DELIMITER ;

# Grant execution rights for the function:
# GRANT EXECUTE ON FUNCTION /*database_name*/.sf_no_enabled_videos TO /*'username'*/@/*'database_host'*/;
# GRANT EXECUTE ON FUNCTION waisda.sp_get_LIKE_tags TO /*'username'*/@'localhost';

# Call stored procedure: (find all enabled videos that contain ‘est’ in title)
# CALL waisda.sp_get_LIKE_tags('ird');

#_________________________________________________
