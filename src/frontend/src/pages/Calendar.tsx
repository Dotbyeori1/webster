import { Row, Col } from "react-bootstrap";
import FullCalendarDemo from "@/components/Apps/Calendar.tsx";
//import WorkingSchedule from "@/components/Dashboard/WorkingSchedule.tsx";
import Container from "react-bootstrap/Container";

const Calendar = () => {
    return (
        <>
            <div className="about-trezo-area ptb-160">
                <Container className="cmw-1308">
                    <Row className="g-4 align-items-center align-items-xxl-start">
                        <Col>
                            <FullCalendarDemo />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default Calendar;
