import React, { PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import styles from './TimesheetDetailModel.scss';

const TimesheetDetailModel = (props) => {
  const { title, onHide, show, timesheetDetails } = props;
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
            <strong>Date</strong>
            <p>{timesheetDetails.task_date}</p>
          </div>
          <div className="col-lg-6">
            <strong>Project</strong>
            <p>{timesheetDetails.project_name}</p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-lg-6">
            <strong>Email-ID</strong>
            <p>{timesheetDetails.emp_work_email}</p>
          </div>
          <div className="col-lg-6">
            <strong>No of hours</strong>
            <p>{timesheetDetails.no_of_hours}</p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-lg-12">
            <strong>Description</strong>
            <p>{timesheetDetails.description}</p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
TimesheetDetailModel.propTypes = {
  title: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool,
  timesheetDetails: PropTypes.object,
};
export default TimesheetDetailModel;
