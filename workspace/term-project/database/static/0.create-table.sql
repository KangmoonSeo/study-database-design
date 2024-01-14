-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Hospital
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Hospital
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Hospital` DEFAULT CHARACTER SET utf8 ;
USE `Hospital` ;

-- -----------------------------------------------------
-- Table `Hospital`.`Medical_specialty`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Hospital`.`Medical_specialty` (
  `department_id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `phone_number` VARCHAR(20) NULL,
  PRIMARY KEY (`department_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Hospital`.`Doctor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Hospital`.`Doctor` (
  `doctor_id` INT NOT NULL,
  `department_id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `address` VARCHAR(255) NULL,
  `phone_number` VARCHAR(20) NULL,
  `password` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`doctor_id`),
  CONSTRAINT `fk_Doctor_Medical_specialty`
    FOREIGN KEY (`department_id`)
    REFERENCES `Hospital`.`Medical_specialty` (`department_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_Doctor_Medical_specialty_idx` ON `Hospital`.`Doctor` (`department_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `Hospital`.`Nurse`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Hospital`.`Nurse` (
  `nurse_id` INT NOT NULL,
  `department_id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `address` VARCHAR(255) NULL,
  `phone_number` VARCHAR(20) NULL,
  `password` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`nurse_id`),
  CONSTRAINT `fk_Nurse_Medical_specialty`
    FOREIGN KEY (`department_id`)
    REFERENCES `Hospital`.`Medical_specialty` (`department_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_Nurse_Medical_specialty_idx` ON `Hospital`.`Nurse` (`department_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `Hospital`.`Patient`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Hospital`.`Patient` (
  `patient_id` INT NOT NULL,
  `doctor_id` INT NULL,
  `nurse_id` INT NULL,
  `name` VARCHAR(45) NOT NULL,
  `ssn` VARCHAR(20) NOT NULL,
  `gender` VARCHAR(10) NOT NULL,
  `address` VARCHAR(255) NULL,
  `blood_type` VARCHAR(10) NULL,
  `height` DECIMAL(5,2) NULL,
  `weight` DECIMAL(5,2) NULL,
  `phone_number` VARCHAR(20) NULL,
  `password` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`patient_id`),
  CONSTRAINT `fk_Patient_Doctor`
    FOREIGN KEY (`doctor_id`)
    REFERENCES `Hospital`.`Doctor` (`doctor_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Patient_Nurse`
    FOREIGN KEY (`nurse_id`)
    REFERENCES `Hospital`.`Nurse` (`nurse_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_Patient_Doctor_idx` ON `Hospital`.`Patient` (`doctor_id` ASC) VISIBLE;

CREATE INDEX `fk_Patient_Nurse_idx` ON `Hospital`.`Patient` (`nurse_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `Hospital`.`Inpatient`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Hospital`.`Inpatient` (
  `admission_date` DATETIME NOT NULL,
  `patient_id` INT NOT NULL,
  `discharge_date` DATETIME NULL,
  `room_id` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`admission_date`, `patient_id`),
  CONSTRAINT `fk_Inpatient_Patient`
    FOREIGN KEY (`patient_id`)
    REFERENCES `Hospital`.`Patient` (`patient_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_Inpatient_Patient_idx` ON `Hospital`.`Inpatient` (`patient_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `Hospital`.`Reservation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Hospital`.`Reservation` (
  `reservation_number` INT NOT NULL,
  `reservation_date` DATETIME NOT NULL,
  `department_id` INT NOT NULL,
  `patient_id` INT NOT NULL,
  PRIMARY KEY (`reservation_number`),
  CONSTRAINT `fk_Reservation_Patient`
    FOREIGN KEY (`patient_id`)
    REFERENCES `Hospital`.`Patient` (`patient_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Reservation_Medical_specialty`
    FOREIGN KEY (`department_id`)
    REFERENCES `Hospital`.`Medical_specialty` (`department_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_Reservation_Patient_idx` ON `Hospital`.`Reservation` (`patient_id` ASC) VISIBLE;

CREATE INDEX `fk_Reservation_Medical_specialty_idx` ON `Hospital`.`Reservation` (`department_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `Hospital`.`Examination`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Hospital`.`Examination` (
  `examination_date` DATETIME NOT NULL,
  `patient_id` INT NOT NULL,
  `doctor_id` INT NULL,
  `examination_details` VARCHAR(255) NULL,
  PRIMARY KEY (`examination_date`, `patient_id`),
  CONSTRAINT `fk_Examination_Patient`
    FOREIGN KEY (`patient_id`)
    REFERENCES `Hospital`.`Patient` (`patient_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Examination_Doctor`
    FOREIGN KEY (`doctor_id`)
    REFERENCES `Hospital`.`Doctor` (`doctor_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_Examination_Patient_idx` ON `Hospital`.`Examination` (`patient_id` ASC) VISIBLE;

CREATE INDEX `fk_Examination_Doctor_idx` ON `Hospital`.`Examination` (`doctor_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `Hospital`.`Treatment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Hospital`.`Treatment` (
  `treatment_date` DATETIME NOT NULL,
  `patient_id` INT NOT NULL,
  `nurse_id` INT NULL,
  `treatment_details` VARCHAR(255) NULL,
  PRIMARY KEY (`treatment_date`, `patient_id`),
  CONSTRAINT `fk_Treatment_Patient`
    FOREIGN KEY (`patient_id`)
    REFERENCES `Hospital`.`Patient` (`patient_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Treatment_Nurse`
    FOREIGN KEY (`nurse_id`)
    REFERENCES `Hospital`.`Nurse` (`nurse_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_Treatment_Patient_idx` ON `Hospital`.`Treatment` (`patient_id` ASC) VISIBLE;

CREATE INDEX `fk_Treatment_Nurse_idx` ON `Hospital`.`Treatment` (`nurse_id` ASC) VISIBLE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
