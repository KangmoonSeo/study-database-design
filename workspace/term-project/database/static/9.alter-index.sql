-- uniqueness
ALTER TABLE Patient ADD CONSTRAINT uq_patient_ssn UNIQUE (ssn);

-- index activation
CREATE INDEX idx_patient_info ON Patient (patient_id, name, gender, weight);