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
//Esta es la forma extraña de poner el calendario en español, en cuestion las fechas
loadCldr(
  require("cldr-data/main/es/ca-gregorian.json"),
  require("cldr-data/main/es/numbers.json"),
  require("cldr-data/main/es/timeZoneNames.json")
);
//Esta seccion es para poner el calendario en español de los textos en general
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
    dataSource: [
      {
        Subject: "Testing",
        Id: 2,
        StartTime: new Date(),
        EndTime: new Date(2020, 4, 9, 11, 0),
      },
    ],
  };
  async componentDidMount() {
    await this.db
      //Recoleccion del personal en un solo documento de firebase en lugar de una coleccion
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
  getEmployeeName(value) {
    return value.resourceData[value.resource.textField];
  }

  getEmployeeImage(value) {
    let resourceName = this.getEmployeeName(value);
    return resourceName.toLowerCase();
  }

  getEmployeeDesignation(value) {
    return value.resourceData.Asignacion;
  }
  resourceHeaderTemplate(props) {
    return (
      <div className="template-wrap">
        <div className="employee-category">
          <div className="employee-image" id={"per-" + props.resourceData.Id}>
            {this.getEmployeeImage(props)}
          </div>
          <div className="employee-name">{this.getEmployeeName(props)}</div>
          <div className="employee-designation">
            {this.getEmployeeDesignation(props)}
          </div>
        </div>
      </div>
    );
  }

  dataBound(args) {}
  currentday(props) {
    if (props.action == "date") {
      console.log(props.currentDate);
      var dia = props.currentDate.toString();
      console.log(dia.substring(0, dia.lenght - 42));
    }
  }
  render() {
    console.log(this.state.employeeData);
    return (
      <div className="content-div">
        <div className="schedule-control-section">
          <div className="col-lg-12 control-section">
            <div className="control-wrapper drag-sample-wrapper">
              <div className="schedule-container">
                <ScheduleComponent
                  cssClass="block-events"
                  width="100%"
                  height="560px"
                  currentView="TimelineDay"
                  resourceHeaderTemplate={this.resourceHeaderTemplate.bind(
                    this
                  )}
                  eventSettings={this.localData}
                  group={{ enableCompactView: false, resources: ["Employee"] }}
                  dataBound={this.dataBound.bind(this)}
                  startHour="08:00"
                  endHour="19:00"
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
