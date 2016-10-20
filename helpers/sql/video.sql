
# Get total number of videos in the database

# USE /*database_name*/;
USE waisda;

DELIMITER //
DROP FUNCTION IF EXISTS `sf_no_videos`;

CREATE FUNCTION `sf_no_videos`()
RETURNS INT
COMMENT 'Stored function to get the total number of videos'
BEGIN
	DECLARE no_videos INT DEFAULT 0;
	SELECT COUNT(*) INTO no_videos FROM Video;
	RETURN no_videos;
END //
DELIMITER ;

# Grant execution rights for the function:
# GRANT EXECUTE ON FUNCTION /*database_name*/.sf_no_videos TO /*'username'*/@/*'database_host'*/;
# GRANT EXECUTE ON FUNCTION waisda.sf_no_videos TO /*'username'*/@'localhost';

# Call stored function:
# SELECT waisda.sf_no_videos();

#_________________________________________________

# Get total number of enabled videos in the database

# USE /*database_name*/;
USE waisda;

DELIMITER //
DROP FUNCTION IF EXISTS `sf_no_enabled_videos`;

CREATE FUNCTION `sf_no_enabled_videos`()
RETURNS INT
COMMENT 'Stored function to get the total number of enabled videos'
BEGIN
	DECLARE no_enabled_videos INT DEFAULT 0;
	SELECT COUNT(*) INTO no_enabled_videos FROM Video WHERE enabled = 1;
	RETURN no_enabled_videos;
END //
DELIMITER ;

# Grant execution rights for the function:
# GRANT EXECUTE ON FUNCTION /*database_name*/.sf_no_enabled_videos TO /*'username'*/@/*'database_host'*/;
# GRANT EXECUTE ON FUNCTION waisda.sf_no_enabled_videos TO /*'username'*/@'localhost';

# Call stored function:
# SELECT waisda.sf_no_enabled_videos();

#_________________________________________________

# Get enabled videos with a certain title

# USE /*database_name*/;
USE waisda;

DELIMITER //
DROP PROCEDURE IF EXISTS `sp_select_videos_title`;

CREATE PROCEDURE `sp_select_videos_title`(IN p_title VARCHAR(255))
COMMENT 'Stored procedure to get videos with a similar title'
BEGIN
	SELECT title, duration, imageUrl, playerType, sourceUrl, fragmentID,  sectionNid, startTime
  FROM Video WHERE enabled = 1 AND title LIKE CONCAT('%', p_title, '%');
END //
DELIMITER ;

# Grant execution rights for the function:
# GRANT EXECUTE ON FUNCTION /*database_name*/.sf_no_enabled_videos TO /*'username'*/@/*'database_host'*/;
# GRANT EXECUTE ON FUNCTION waisda.sf_no_enabled_videos TO /*'username'*/@'localhost';

# Call stored procedure: (find all enabled videos that contain ‘est’ in title)
# CALL waisda.sp_select_videos_title('est');

#_________________________________________________

# Add new entry for the Video table

# USE /*database_name*/;
USE waisda;

DELIMITER //
DROP PROCEDURE IF EXISTS `sp_insert_video`;

CREATE PROCEDURE `sp_insert_video`(
  IN p_title VARCHAR(255),
  IN p_duration INT(11),
  IN p_imageUrl VARCHAR(255),
  IN p_enabled TINYINT(1),
  IN p_playerType VARCHAR(15),
  IN p_sourceUrl VARCHAR(255),
  IN p_fragmentID VARCHAR(255),
  IN p_sectionNid INT(11),
  IN p_startTime INT(11)
)
COMMENT 'Stored procedure to add a record in the Video table'
BEGIN
	INSERT INTO Video (title, duration, imageUrl, enabled, playerType, sourceUrl, fragmentID, sectionNid, startTime)
  VALUES (p_title, p_duration, p_imageUrl, p_enabled, p_playerType, p_sourceUrl, p_fragmentID, p_sectionNid, p_startTime);
END //
DELIMITER ;

# Grant execution rights for the function:
# GRANT EXECUTE ON FUNCTION /*database_name*/.sp_insert_video TO /*'username'*/@/*'database_host'*/;
# GRANT EXECUTE ON FUNCTION waisda.sp_insert_video TO /*'username'*/@'localhost';

# Call stored procedure:
# CALL waisda.sp_insert_video('test','000000',NULL,0,'JW',NULL,NULL,NULL,NULL);

#_________________________________________________

# Retrieve all entries from the Video table

# USE /*database_name*/;
USE waisda;

DELIMITER //
DROP PROCEDURE IF EXISTS `sp_select_video`;

CREATE PROCEDURE `sp_select_video`()
COMMENT 'Stored procedure to select all records from the Video table'
BEGIN
	SELECT * FROM Video;
END //
DELIMITER ;

# Grant execution rights for the function:
# GRANT EXECUTE ON FUNCTION /*database_name*/.sp_select_video TO /*'username'*/@/*'database_host'*/;
# GRANT EXECUTE ON FUNCTION waisda.sp_select_video TO /*'username'*/@'localhost';

# Call stored procedure: (find all enabled videos that contain ‘est’ in title)
# CALL waisda.sp_select_video();

#_________________________________________________
