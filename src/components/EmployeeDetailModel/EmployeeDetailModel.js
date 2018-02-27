import React, { PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import dateFormat from 'dateformat';
import styles from './EmployeeDetailModel.scss';

const EmployeeDetailModel = (props) => {
  const { title, onHide, show, employeeDetails } = props;
  return (
    <Modal bsSize="lg" show={show} onHide={onHide}>
      <Modal.Header closeButton className={styles.modelHeader}>
        <Modal.Title>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modelBody}>
        <div className="row">
          <div className="col-lg-6">
            <strong>Employee ID</strong>
            <p>{employeeDetails.employee_id}</p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-lg-6">
            <strong>Name</strong>
            <p>{employeeDetails.emp_firstname} {employeeDetails.emp_lastname}</p>
          </div>
          <div className="col-lg-6">
            <strong>Email-ID</strong>
            <p><a href={'mailto:' + employeeDetails.emp_work_email}>{employeeDetails.emp_work_email}</a></p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-lg-6">
            <strong>Mobile Number</strong>
            <p><a href={'tel:' + employeeDetails.emp_mobile}>{employeeDetails.emp_mobile}</a></p>
          </div>
          <div className="col-lg-6">
            <strong>Date Of Birth</strong>
            <p>{employeeDetails.emp_birthday && dateFormat(employeeDetails.emp_birthday, 'mmm dd')}</p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-lg-6">
            <strong>Skype ID</strong>
            <p>{employeeDetails.skype_id}</p>
          </div>
          <div className="col-lg-6">
            <strong>Skype For Business ID</strong>
            <p>{employeeDetails.skype_bussiness_id}</p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-lg-6">
            <strong>Department</strong>
            <p>{employeeDetails.team_name}</p>
          </div>
          <div className="col-lg-6">
            <strong>Designation</strong>
            <p>{employeeDetails.job_title}</p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-lg-6">
            <strong>Blood Group</strong>
            <p>{employeeDetails.emp_blood_group}</p>
          </div>
          <div className="col-lg-6">
            <strong>Reporting To</strong>
            <p>{employeeDetails.reporting_to_name}</p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-lg-12">
            <strong>Present Address</strong>
            <p>{employeeDetails.emp_street1}</p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
EmployeeDetailModel.propTypes = {
  title: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool,
  employeeDetails: PropTypes.object,
};
export default EmployeeDetailModel;
