import React, { Component } from "react";
import {
  ScheduleComponent,
  TreeViewArgs,
  ResourcesDirective,
  ResourceDirective,
  ViewsDirective,
  ViewDirective,
  ResourceDetails,
  Inject,
  TimelineViews,
  Resize,
  DragAndDrop,
  Day,
  EventSettingsModel,
} from "@syncfusion/ej2-react-schedule";
import "./Calendar.css";

export default class Calendar extends Component {
  constructor() {
    super(...arguments);

    this.employeeData = [
      {
        Text: "Alice",
        Id: 1,
        GroupId: 1,
        Color: "rgb(49,48,135)",
        Designation: "Content writer",
      },
      {
        Text: "Nancy",
        Id: 2,
        GroupId: 2,
        Color: "rgb(228,95,99)",
        Designation: "Designer",
      },
      {
        Text: "Robert",
        Id: 3,
        GroupId: 1,
        Color: "rgb(49,48,135)",
        Designation: "Software Engineer",
      },
      {
        Text: "Robson",
        Id: 4,
        GroupId: 2,
        Color: "rgb(228,95,99)",
        Designation: "Support Engineer",
      },
      {
        Text: "Laura",
        Id: 5,
        GroupId: 1,
        Color: "rgb(49,48,135)",
        Designation: "Human Resource",
      },
      {
        Text: "Margaret",
        Id: 6,
        GroupId: 2,
        Color: "rgb(228,95,99)",
        Designation: "Content Analyst",
      },
    ];
  }
  localData = {
    dataSource: [
      {
        Subject: "Testing",
        Id: 2,
        StartTime: new Date(2018, 7, 1, 10, 11),
        EndTime: new Date(2018, 7, 1, 11, 0),
      },
    ],
  };
  getEmployeeName(value) {
    return value.resourceData[value.resource.textField];
  }

  getEmployeeImage(value) {
    let resourceName = this.getEmployeeName(value);
    return resourceName.toLowerCase();
  }

  getEmployeeDesignation(value) {
    return value.resourceData.Designation;
  }
  resourceHeaderTemplate(props) {
    return (
      <div className="template-wrap">
        <div className="employee-category">
          <div
            className={"employee-image " + this.getEmployeeImage(props)}
          ></div>
          <div className="employee-name">{this.getEmployeeName(props)}</div>
          <div className="employee-designation">
            {this.getEmployeeDesignation(props)}
          </div>
        </div>
      </div>
    );
  }

  dataBound(args) {
    console.log(this.localData);
  }
  currentday(props) {
    console.log(props.currentDate);
    var dia = props.currentDate.toString();
    console.log(dia.substring(0, dia.lenght - 42));
  }
  render() {
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
                >
                  <ResourcesDirective>
                    <ResourceDirective
                      field="EmployeeId"
                      title="Employees"
                      name="Employee"
                      allowMultiple={true}
                      dataSource={this.employeeData}
                      textField="Text"
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
