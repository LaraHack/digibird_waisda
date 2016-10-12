# Get total number of participants

# USE /*database_name*/;
USE waisda;

DELIMITER //
DROP FUNCTION IF EXISTS `sf_no_participants`;

CREATE FUNCTION `sf_no_participants`()
RETURNS INT
COMMENT 'Stored function to get the total number of participants in the game'
BEGIN
	DECLARE no_participants INT DEFAULT 0;
	SELECT COUNT(DISTINCT user_id) INTO no_participants FROM Participant;
	RETURN no_participants;
END //
DELIMITER ;

# Grant execution rights for the function:
# GRANT EXECUTE ON FUNCTION /*database_name*/.sf_no_videos TO /*'username'*/@/*'database_host'*/;
# GRANT EXECUTE ON FUNCTION waisda.sf_no_participants TO /*'username'*/@'localhost';

# Call stored function:
# SELECT waisda.sf_no_participants();

#_________________________________________________

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

# Get total number of videos in the database

# USE /*database_name*/;
USE waisda;

DELIMITER //
DROP FUNCTION IF EXISTS `sf_no_videos`;

CREATE FUNCTION `sf_no_videos`()
RETURNS INT
COMMENT 'Stored function to get the total number of records in the Video table'
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

# Get total number of games

# USE /*database_name*/;
USE waisda;

DELIMITER //
DROP FUNCTION IF EXISTS `sf_no_games`;

CREATE FUNCTION `sf_no_games`()
RETURNS INT
COMMENT 'Stored function to get the total number of games played'
BEGIN
	DECLARE no_games INT DEFAULT 0;
	SELECT COUNT(*) INTO no_games FROM Game;
	RETURN no_games;
END //
DELIMITER ;

# Grant execution rights for the function:
# GRANT EXECUTE ON FUNCTION /*database_name*/.sf_no_tags TO /*'username'*/@/*'database_host'*/;
# GRANT EXECUTE ON FUNCTION waisda.sf_no_games TO /*'username'*/@'localhost';

# Call stored function:
# SELECT waisda.sf_no_games();

#_________________________________________________
