
# Insert one dictionary term

# USE /*database_name*/;
USE waisda;

DELIMITER //
DROP FUNCTION IF EXISTS `sp_get_dict_term`;

CREATE PROCEDURE `sp_get_dict_term`(IN p_normalizedTag VARCHAR(63))
COMMENT 'Get dictionary terms that contain a certain text'
BEGIN
  SELECT * from DictionaryEntry
  WHERE DictionaryEntry.normalizedTag LIKE CONCAT('%', p_normalizedTag, '%');
END //
DELIMITER ;

# Grant execution rights for the function:
# GRANT EXECUTE ON FUNCTION /*database_name*/.sf_no_tags TO /*'username'*/@/*'database_host'*/;
# GRANT EXECUTE ON FUNCTION waisda.sp_get_dict_term TO /*'username'*/@'localhost';

# Call stored function:
# CALL waisda.sp_get_dict_term('%zwavel%');

#_________________________________________________

# Insert one dictionary term

# USE /*database_name*/;
USE waisda;

DELIMITER //
DROP FUNCTION IF EXISTS `sp_insert_dict`;

CREATE PROCEDURE `sp_insert_dict`(IN p_normalizedTag VARCHAR(63), IN p_dictionary VARCHAR(63))
COMMENT 'Add one dictionary term'
BEGIN
  INSERT INTO `DictionaryEntry` (`normalizedTag`, `dictionary`)
	VALUES (p_normalizedTag, p_dictionary);
END //
DELIMITER ;

# Grant execution rights for the function:
# GRANT EXECUTE ON FUNCTION /*database_name*/.sf_no_tags TO /*'username'*/@/*'database_host'*/;
# GRANT EXECUTE ON FUNCTION waisda.sp_insert_dict TO /*'username'*/@'localhost';

# Call stored function:
# CALL waisda.sp_insert_dict('test', 'test');

#_________________________________________________
