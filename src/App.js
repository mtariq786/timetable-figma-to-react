import React, { useEffect, useState, useDispatch } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import { Button } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import SidebarItem from "./SidebarItem";
import Modal from "react-bootstrap/Modal";
import {
  FaCalendarAlt,
  FaBookOpen,
  FaFileAlt,
  FaAddressCard,
  FaCalendarCheck,
  FaRegCircle,
  FaShower,
} from "react-icons/fa";
import { TbZoomMoney } from "react-icons/tb";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import events from "./events";
import image from "./assets/picture.png";
import esLocale from "@fullcalendar/core/locales/en-au";

export default function App() {
  const [active, setActive] = useState(1);
  const [toggle, settoggle] = useState(false);
  const [event, setevent] = useState();
  const [show, setshow] = useState(false);
  const [date, setdate] = useState(null);
  let firstDaty = 1;
  const sidebar_menu = [
    {
      id: 1,
      icon: <FaCalendarAlt fontSize="22px" />,
      path: "/",
      title: "Agenda",
    },
    {
      id: 2,
      icon: <FaBookOpen fontSize="22px" />,
      path: "/",
      title: "Exercises",
    },
    {
      id: 3,
      icon: <FaFileAlt fontSize="22px" />,
      path: "/",
      title: "Material",
    },
  ];
  const sidebar_profilemenu = [
    {
      id: 4,
      icon: <FaAddressCard fontSize="25px" />,
      path: "/",
      title: "Personal",
    },
    {
      id: 5,
      icon: <TbZoomMoney fontSize="22px" />,
      path: "/",
      title: "Invoices",
    },
    {
      id: 6,
      icon: <FaCalendarCheck fontSize="22px" />,
      path: "/",
      title: "Availability",
    },
  ];
  const handleEnd = () => {
    settoggle(false);
    setshow(!show);
  };
  const renderEventContent = (eventInfo) => {
    return (
      <div style={{ paddingLeft: 10 }}>
        <b style={{ color: "black", margin: 0 }}>
          <FaRegCircle fontSize="7px" color="#D4145A" />
          <span style={{ marginLeft: 5 }}>{eventInfo.event.title}</span>
        </b>
        <p
          style={{
            color: "black",
            marginLeft: 8,
            marginTop: 0,
            marginBottom: 0,
            fontSize: 10,
          }}
        >
          {eventInfo.event.extendedProps.description}
        </p>
      </div>
    );
  };
  const location = useLocation();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  
// var day =  date.split(',')[0]
  
  useEffect(() => {
    sidebar_menu.forEach((element) => {
      if (location.pathname === element.path) {
        setActive(element.id);
      }
    });
  }, [location.pathname]);

  const __navigate = (id) => {
    setActive(id);
  };
  
  const handleEventClick = ({ event, el }) => {
    settoggle(!toggle);
    setevent(event);
    setdate( event._instance.range.start.toLocaleDateString(undefined, options));
  };

  const handleClose = () => settoggle(false);
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#2D224C",
        }}
      >
        <div
          style={{
            width: "20%",
            paddingLeft: 17,
            paddingRight: 7,
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              color: "#D4145A",
              fontWeight: "600",
              fontSize: 15,
              textAlign: "left",
              paddingLeft: "23px",
            }}
          >
            YOUR PATH
          </p>
          {sidebar_menu.map((item, index) => (
            <div
              className="sidebar"
              key={index}
              onClick={() => __navigate(item.id)}
            >
              <SidebarItem active={item.id === active} item={item} />
            </div>
          ))}
          <p
            style={{
              color: "#D4145A",
              fontWeight: "600",
              fontSize: 15,
              textAlign: "left",
              paddingLeft: "23px",
              marginTop: 70,
            }}
          >
            YOUR PROFILE
          </p>
          {sidebar_profilemenu.map((item, index) => (
            <div
              className="sidebar"
              key={index}
              onClick={() => __navigate(item.id)}
            >
              <SidebarItem active={item.id === active} item={item} />
            </div>
          ))}
        </div>
        <div style={{ width: "80%", padding: 20 }}>
          <FullCalendar
            defaultView="dayGridMonth"
            firstDay={firstDaty}
            locale={esLocale}
            header={{
              left: "prev,next",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            themeSystem="Simplex"
            displayEventTime={true}
            plugins={[dayGridPlugin]}
            events={events}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
          />
          <Modal
            show={toggle}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {event !== undefined && event !== null ? (
                   <p
                    style={{
                      fontFamily: "poppins",
                      fontSize: 36,
                      fontWeight: "600",
                      color: "#2D224C",
                    }}
                  >
                    {event.extendedProps.description}
                  </p>
                ) : (
                  <p>p is here</p>
                )}

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={image}
                    style={{ width: 72, height: 72, borderRadius: 32 }}
                  />
                  <p
                    style={{
                      fontFamily: "poppins",
                      fontSize: 24,
                      fontWeight: "500",
                      color: "#2D224C",
                      marginLeft: 17,
                    }}
                  >
                    Liam
                  </p>
                </div>
              </div>
              <p
                style={{
                  fontFamily: "poppins",
                  fontSize: 20,
                  fontWeight: "500",
                  margin: 0,
                }}
              >
                Topic:Food
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 53,
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p
                    style={{
                      color: "#2D224C",
                      fontFamily: "poppins",
                      fontSize: 20,
                      fontWeight: "500",
                      margin: 0,
                    }}
                  >
                    Data
                  </p>
                  {event !== undefined && event !== null ? (
                  <p
                    style={{
                      color: "#D4145A",
                      fontFamily: "poppins",
                      fontSize: 20,
                      fontWeight: "500",
                      margin: 0,
                    }}
                  >
                    Tuesday 16 October 2022
                  </p>): <p
                    style={{
                      color: "#D4145A",
                      fontFamily: "poppins",
                      fontSize: 20,
                      fontWeight: "500",
                      margin: 0,
                    }}
                  >
                    
                    Tuesday 16 October 2022
                  </p>}
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p
                    style={{
                      color: "#2D224C",
                      fontFamily: "poppins",
                      fontSize: 20,
                      fontWeight: "500",
                      margin: 0,
                    }}
                  >
                    Time
                  </p>
                  <p
                    style={{
                      color: "#D4145A",
                      fontFamily: "poppins",
                      fontSize: 20,
                      fontWeight: "500",
                      margin: 0,
                    }}
                  >
                    09:30
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p
                    style={{
                      color: "#2D224C",
                      fontFamily: "poppins",
                      fontSize: 20,
                      fontWeight: "500",
                      margin: 0,
                    }}
                  >
                    Duration
                  </p>
                  <p
                    style={{
                      color: "#D4145A",
                      fontFamily: "poppins",
                      fontSize: 20,
                      fontWeight: "500",
                      margin: 0,
                    }}
                  >
                    45mins
                  </p>
                </div>
              </div>
              <Button
                onClick={handleEnd}
                style={{
                  backgroundColor: "#D4145A",
                  color: "white",
                  width: "100%",
                  border: 0,
                  fontWeight: "600",
                  fontSize: 20,
                  marginTop: 30,
                }}
              >
                JOIN
              </Button>
              <div
                style={{ display: "flex", flexDirection: "row", marginTop: 14 }}
              >
                <p
                  style={{
                    color: "#2D224C",
                    fontFamily: "poppins",
                    fontSize: 20,
                    fontWeight: "500",
                    margin: 0,
                    textDecoration: "underline",
                  }}
                >
                  Material:
                </p>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p
                    style={{
                      color: "#2D224C",
                      fontFamily: "poppins",
                      fontSize: 20,
                      fontWeight: "500",
                      margin: 0,
                      textDecoration: "underline",
                      marginLeft: 55,
                    }}
                  >
                    Video Listening Introduzione
                  </p>
                  <p
                    style={{
                      color: "#2D224C",
                      fontFamily: "poppins",
                      fontSize: 20,
                      fontWeight: "500",
                      margin: 0,
                      textDecoration: "underline",
                      marginLeft: 55,
                    }}
                  >
                    Video Listening Introduzione
                  </p>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          <Modal
            show={show}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <p
                  style={{
                    fontFamily: "poppins",
                    fontSize: 36,
                    fontWeight: "600",
                    color: "#2D224C",
                  }}
                >
                  Speaking class
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={image}
                    style={{ width: 72, height: 72, borderRadius: 32 }}
                  />
                  <p
                    style={{
                      fontFamily: "poppins",
                      fontSize: 24,
                      fontWeight: "500",
                      color: "#2D224C",
                      marginLeft: 17,
                    }}
                  >
                    Liam
                  </p>
                </div>
              </div>
              <p
                style={{
                  fontFamily: "poppins",
                  fontSize: 20,
                  fontWeight: "500",
                  margin: 0,
                }}
              >
                Topic:Food
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 53,
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p
                    style={{
                      color: "#2D224C",
                      fontFamily: "poppins",
                      fontSize: 20,
                      fontWeight: "500",
                      margin: 0,
                    }}
                  >
                    Data
                  </p>
                  <p
                    style={{
                      color: "#8065C9",
                      fontFamily: "poppins",
                      fontSize: 20,
                      fontWeight: "500",
                      margin: 0,
                    }}
                  >
                    Tuesday 16 October 2022
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p
                    style={{
                      color: "#2D224C",
                      fontFamily: "poppins",
                      fontSize: 20,
                      fontWeight: "500",
                      margin: 0,
                    }}
                  >
                    Time
                  </p>
                  <p
                    style={{
                      color: "#8065C9",
                      fontFamily: "poppins",
                      fontSize: 20,
                      fontWeight: "500",
                      margin: 0,
                    }}
                  >
                    09:30
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p
                    style={{
                      color: "#2D224C",
                      fontFamily: "poppins",
                      fontSize: 20,
                      fontWeight: "500",
                      margin: 0,
                    }}
                  >
                    Duration
                  </p>
                  <p
                    style={{
                      color: "#8065C9",
                      fontFamily: "poppins",
                      fontSize: 20,
                      fontWeight: "500",
                      margin: 0,
                    }}
                  >
                    45mins
                  </p>
                </div>
              </div>
              <Button
                style={{
                  backgroundColor: "#8065C9",
                  color: "white",
                  width: "100%",
                  border: 0,
                  fontWeight: "600",
                  fontSize: 20,
                  marginTop: 30,
                }}
              >
                WATCH RECORDING
              </Button>
              <div
                style={{ display: "flex", flexDirection: "row", marginTop: 14 }}
              >
                <p
                  style={{
                    color: "#2D224C",
                    fontFamily: "poppins",
                    fontSize: 20,
                    fontWeight: "500",
                    margin: 0,
                    textDecoration: "underline",
                  }}
                >
                  Material:
                </p>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p
                    style={{
                      color: "#2D224C",
                      fontFamily: "poppins",
                      fontSize: 20,
                      fontWeight: "500",
                      margin: 0,
                      textDecoration: "underline",
                      marginLeft: 55,
                    }}
                  >
                    Lesson recap
                  </p>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
}
