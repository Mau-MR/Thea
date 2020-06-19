import React, { Component } from "react";
import {
  ScheduleComponent,
  ResourcesDirective,
  ResourceDirective,
  ViewsDirective,
  ViewDirective,
  Inject,
  TimelineViews,
  Resize,
  DragAndDrop,
  Day,
} from "@syncfusion/ej2-react-schedule";
import "./Calendar.css";
import { loadCldr, L10n } from "@syncfusion/ej2-base";
import spanish from "./es.json";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
//setting the language name to spanish
loadCldr(
  require("cldr-data/main/es/ca-gregorian.json"),
  require("cldr-data/main/es/numbers.json"),
  require("cldr-data/main/es/timeZoneNames.json")
);
//The method that set the locale and also pass spanish a json with the configuration of
//the scheculer
L10n.load(spanish);

export default class Calendar extends Component {
  constructor() {
    super(...arguments);
    this.db = firebase.firestore();
    this.state = {
      employeeData: [],
    };
  }
  localData = {
    dataSource: [],
  };
  //loading the information  of the workers
  async componentDidMount() {
    await this.db
      //recolecting the information of the worker on one only document
      .collection("Sucursal")
      .doc(firebase.auth().currentUser.uid)
      .collection("Personal")
      .get()
      .then((snapshot) => {
        var personal = snapshot.docs.map((doc) => {
          return doc.data();
        });
        var size = Object.keys(personal[0]).length;
        personal = Object.values(personal[0]);
        //Asignando ID y color al personal
        for (var i = 0; i <= size - 1; i++) {
          if (i % 2 == 0) {
            var col = { Color: "rgb(228,95,99)", Id: i + 1 };
          } else {
            var col = { Color: "rgb(49,48,135)", Id: i + 1 };
          }
          var unid = Object.assign(personal[i], col);
          personal[i] = unid;
        }
        this.setState({
          employeeData: personal,
        });
      });
  }
  //things related with the employee information
  getEmployeeName(value) {
    return value.resourceData.Nombre;
  }

  getEmployeeDesignation(value) {
    return value.resourceData.Asignacion;
  }
  resourceHeaderTemplate(props) {
    return (
      <div className="template-wrap">
        <div className="employee-category">
          <img className="employee-image" src={props.resourceData.Imagen}></img>
          <div className="employee-name">{this.getEmployeeName(props)}</div>
          <div className="employee-designation">
            {this.getEmployeeDesignation(props)}
          </div>
        </div>
      </div>
    );
  }

  //things related with the schedule and its options
  dataBound(args) {
    //triggers every time one  oppointment is binded to the schedule
    console.log(this.localData);
  }
  currentday(props) {
    //trigger every time that the user change of day
    if (props.action == "date") {
      console.log(props.currentDate);
      var dia = props.currentDate.toString();
      console.log(dia.substring(0, dia.lenght - 42));
    }
  }
  onPopUpOpen(args) {
    //cancel the trigger of the default popUps
    args.cancel = true;
  }

  onEventClick(args) {
    //on event click
    console.log(args);
  }
  onCellClicked(args) {
    console.log(args);
  }
  render() {
    return (
      <div className="content-div">
        <div className="schedule-control-section">
          <div className="col-lg-12 control-section">
            <div className="control-wrapper drag-sample-wrapper">
              <div className="schedule-container">
                {" "}
                <ScheduleComponent
                  cssClass="block-events"
                  width="100%"
                  height="560px"
                  currentView="TimelineDay"
                  resourceHeaderTemplate={this.resourceHeaderTemplate.bind(
                    this
                  )}
                  eventSettings={this.localData}
                  popupOpen={this.onPopUpOpen.bind(this)}
                  group={{ enableCompactView: false, resources: ["Employee"] }}
                  dataBound={this.dataBound.bind(this)}
                  startHour="08:00"
                  endHour="19:00"
                  cellClick={this.onCellClicked.bind(this)}
                  eventClick={this.onEventClick.bind(this)}
                  navigating={this.currentday.bind(this)}
                  locale="es"
                >
                  <ResourcesDirective>
                    <ResourceDirective
                      field="EmployeeId"
                      title="Employees"
                      name="Employee"
                      allowMultiple={true}
                      dataSource={this.state.employeeData}
                      textField="Nombre"
                      idField="Id"
                      colorField="Color"
                    ></ResourceDirective>
                  </ResourcesDirective>
                  <ViewsDirective>
                    <ViewDirective option="Day" />
                    <ViewDirective option="TimelineDay" />
                  </ViewsDirective>
                  <Inject
                    services={[Day, TimelineViews, Resize, DragAndDrop]}
                  />
                </ScheduleComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
