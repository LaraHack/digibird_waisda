
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
