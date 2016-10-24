SELECT Game.video_id, Video.title, Video.imageUrl, Video.sourceUrl, Video.duration, TagEntry.creationDate, TagEntry.tag
FROM TagEntry, Game, Video
WHERE TagEntry.tag LIKE '%ird%'
	AND TagEntry.game_id = Game.id
	AND Video.id = Game.video_id
ORDER BY TagEntry.creationDate DESC;

SELECT DISTINCT Game.video_id, MAX(TagEntry.creationDate) AS creationDate
FROM TagEntry, Game
WHERE TagEntry.tag LIKE '%ird%'
AND TagEntry.game_id = Game.id
GROUP BY Game.video_id
ORDER BY MAX(TagEntry.creationDate) DESC;

INSERT INTO TagEntry(
	dictionary,
	normalizedTag,
	score,
	tag,
	gameTime,
	typingDuration,
	game_id,
	owner_id,
	matchingTagEntry_id,
	pioneer,
	creationDate)
VALUES
(NULL,'bird',5,'bird',2700,400,131,4,NULL,1,NOW());

INSERT INTO Game(
	start,
	initiator_id,
	video_id,
	countExistingVideoTags)
VALUES
(STR_TO_DATE('2016-10-21 14:15:22', '%Y-%m-%d %h:%i:%s'),4,1957,0);


SET sql_mode = '';
SELECT STR_TO_DATE('2016-10-21 14:15:22', '%Y-%m-%d %H:%i:%s');

#_________________________________________________

# Get latest annotated videos and their tags after a certain date

# USE /*database_name*/;
USE waisda;

DELIMITER //
DROP PROCEDURE IF EXISTS `sp_get_videos_and_tags_AFTER`;

CREATE PROCEDURE `sp_get_videos_and_tags_AFTER`(IN p_date DATETIME)
COMMENT 'Get videos and their tags after certain date'
BEGIN
	SELECT Game.video_id, Video.title, Video.imageUrl, Video.sourceUrl, Video.duration, TagEntry.creationDate, TagEntry.tag
	FROM TagEntry, Game, Video
	WHERE TagEntry.game_id = Game.id
		AND Video.id = Game.video_id
		AND TagEntry.creationDate >= p_date
	ORDER BY TagEntry.creationDate DESC;
END //
DELIMITER ;

# Grant execution rights for the function:
# GRANT EXECUTE ON PROCEDURE gdatabase_name*/.sf_no_tags TO /*'username'*/@/*'database_host'*/;
# GRANT EXECUTE ON PROCEDURE waisda.sp_get_videos_and_tags_AFTER TO /*'username'*/@'localhost';

# Call stored procedure:
# CALL waisda.sp_get_videos_and_tags_AFTER(STR_TO_DATE('2016-10-20', '%Y-%m-%d'));

#_________________________________________________

# Get latest annotated videos and their tags after a certain date

# USE /*database_name*/;
USE waisda;

DELIMITER //
DROP PROCEDURE IF EXISTS `sp_get_videos_LIKE_tags_AFTER`;

CREATE PROCEDURE `sp_get_videos_LIKE_tags_AFTER`(IN p_tag VARCHAR(255), IN p_date DATETIME)
COMMENT 'Get videos and their tags after certain date'
BEGIN
	SELECT Game.video_id, Video.title, Video.imageUrl, Video.sourceUrl, Video.duration, TagEntry.creationDate, TagEntry.tag
	FROM TagEntry, Game, Video
	WHERE TagEntry.tag LIKE CONCAT('%', p_tag, '%')
		AND TagEntry.game_id = Game.id
		AND Video.id = Game.video_id
		AND TagEntry.creationDate >= p_date
	ORDER BY TagEntry.creationDate DESC;
END //
DELIMITER ;

# Grant execution rights for the function:
# GRANT EXECUTE ON PROCEDURE gdatabase_name*/.sf_no_tags TO /*'username'*/@/*'database_host'*/;
# GRANT EXECUTE ON PROCEDURE waisda.sp_get_videos_LIKE_tags_AFTER TO /*'username'*/@'localhost';

# Call stored procedure:
# CALL waisda.sp_get_videos_LIKE_tags_AFTER('ird', STR_TO_DATE('2016-10-01', '%Y-%m-%d'));

#_________________________________________________

# Get latest annotated videos and their tags

# USE /*database_name*/;
USE waisda;

DELIMITER //
DROP PROCEDURE IF EXISTS `sp_get_videos_with_tags_DESC`;

CREATE PROCEDURE `sp_get_videos_with_tags_DESC`(IN p_tag VARCHAR(255))
COMMENT 'Get latest annotated videos and their tags'
BEGIN
	SELECT Game.video_id, Video.title, Video.imageUrl, Video.sourceUrl, Video.duration, TagEntry.creationDate, TagEntry.tag
	FROM TagEntry, Game, Video
	WHERE TagEntry.tag LIKE CONCAT('%', p_tag, '%')
		AND TagEntry.game_id = Game.id
		AND Video.id = Game.video_id
	ORDER BY TagEntry.creationDate DESC;
END //
DELIMITER ;

# Grant execution rights for the function:
# GRANT EXECUTE ON PROCEDURE gdatabase_name*/.sf_no_tags TO /*'username'*/@/*'database_host'*/;
# GRANT EXECUTE ON PROCEDURE waisda.sp_get_videos_with_tags_DESC TO /*'username'*/@'localhost';

# Call stored procedure:
# CALL waisda.sp_get_videos_with_tags_DESC('ird');

#_________________________________________________

# Get videos that contain tags with a certain text in them, order the videos
# by tag creation, the most recent annotated videos first based on the timestamp of the tags

# USE /*database_name*/;
USE waisda;

DELIMITER //
DROP PROCEDURE IF EXISTS `sp_get_videos_LIKE_tags_DESC`;

CREATE PROCEDURE `sp_get_videos_LIKE_tags_DESC`(IN p_tag VARCHAR(255))
COMMENT 'Get videos that contain certain text in tags, latest ones first'
BEGIN
	SELECT Video.id, Video.title, Video.imageUrl, Video.sourceUrl, Video.duration FROM Video
	WHERE Video.id IN
	(SELECT Game.video_id, TagEntry.creationDate, TagEntry.tag FROM TagEntry, Game
	WHERE TagEntry.tag LIKE CONCAT('%', p_tag, '%')
		AND TagEntry.game_id = Game.id
	ORDER BY TagEntry.creationDate DESC);
END //
DELIMITER ;

# Grant execution rights for the function:
# GRANT EXECUTE ON FUNCTION /*database_name*/.sf_no_enabled_videos TO /*'username'*/@/*'database_host'*/;
# GRANT EXECUTE ON FUNCTION waisda.sp_get_videos_LIKE_tags TO /*'username'*/@'localhost';

# Call stored procedure: (find all enabled videos that contain ‘est’ in title)
# CALL waisda.sp_get_videos_LIKE_tags('ird');

#_________________________________________________

# Get videos that contain tags with a certain text in them

# USE /*database_name*/;
USE waisda;

DELIMITER //
DROP PROCEDURE IF EXISTS `sp_get_videos_LIKE_tags`;

CREATE PROCEDURE `sp_get_videos_LIKE_tags`(IN p_tag VARCHAR(255))
COMMENT 'Get videos that contain certain text in tags'
BEGIN
	SELECT Video.id, Video.title, Video.imageUrl, Video.sourceUrl, Video.duration FROM Video
	WHERE Video.id IN
	(SELECT Game.video_id FROM TagEntry, Game
	WHERE TagEntry.tag LIKE CONCAT('%', p_tag, '%') AND TagEntry.game_id = Game.id);
END //
DELIMITER ;

# Grant execution rights for the function:
# GRANT EXECUTE ON FUNCTION /*database_name*/.sf_no_enabled_videos TO /*'username'*/@/*'database_host'*/;
# GRANT EXECUTE ON FUNCTION waisda.sp_get_videos_LIKE_tags TO /*'username'*/@'localhost';

# Call stored procedure: (find all enabled videos that contain ‘est’ in title)
# CALL waisda.sp_get_videos_LIKE_tags('ird');

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
