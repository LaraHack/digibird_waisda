
SELECT Video.id, Video.title, Video.imageUrl, Video.sourceUrl
(SELECT TagEntry.id, TagEntry.tag, TagEntry.creationDate FROM
TagEntry) AS Tags
FROM Video
WHERE Video.id IN (SELECT Game.video_id FROM TagEntry, Game
WHERE TagEntry.tag LIKE '%ird%' AND TagEntry.game_id = Game.id);

SET @GameIds = SELECT Game.video_id FROM TagEntry, Game
WHERE TagEntry.tag LIKE '%ird%' AND TagEntry.game_id = Game.id;

select TagEntry.tag, Game.id, Game.video_id from TagEntry, Game
where TagEntry.tag like '%ird%' and TagEntry.game_id = Game.id;


#_________________________________________________

# Get latest annotated videos and their tags

# USE /*database_name*/;
USE waisda;

DELIMITER //
DROP PROCEDURE IF EXISTS `sp_get_videos_with_tags_DESC`;

CREATE PROCEDURE `sp_get_videos_with_tags_DESC`()
RETURNS INT
COMMENT 'Get latest annotated videos and their tags'
BEGIN

END //
DELIMITER ;

# Grant execution rights for the function:
# GRANT EXECUTE ON PROCEDURE gdatabase_name*/.sf_no_tags TO /*'username'*/@/*'database_host'*/;
# GRANT EXECUTE ON PROCEDURE waisda.sp_get_videos_with_tags_DESC TO /*'username'*/@'localhost';

# Call stored procedure:
# SELECT waisda.sp_get_videos_with_tags_DESC();

#_________________________________________________

# Get tags with a certain text in them

# USE /*database_name*/;
USE waisda;

DELIMITER //
DROP PROCEDURE IF EXISTS `sp_get_videos_LIKE_tags`;

CREATE PROCEDURE `sp_get_videos_LIKE_tags`(IN p_tag VARCHAR(255))
COMMENT 'Get videos that contain certain text in tags'
BEGIN
	SELECT Video.id, Video.title, Video.imageUrl, Video.sourceUrl FROM Video
	WHERE Video.id IN
	(SELECT Game.video_id FROM TagEntry, Game
	WHERE TagEntry.tag LIKE CONCAT('%', p_tag, '%') AND TagEntry.game_id = Game.id);
END //
DELIMITER ;

# Grant execution rights for the function:
# GRANT EXECUTE ON FUNCTION /*database_name*/.sf_no_enabled_videos TO /*'username'*/@/*'database_host'*/;
# GRANT EXECUTE ON FUNCTION waisda.sf_no_enabled_videos TO /*'username'*/@'localhost';

# Call stored procedure: (find all enabled videos that contain ‘est’ in title)
# CALL waisda.sp_select_videos_title('est');

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
