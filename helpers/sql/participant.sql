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
