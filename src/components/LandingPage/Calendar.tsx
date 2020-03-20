import React, { Component } from 'react'
import { ScheduleComponent, TreeViewArgs, ResourcesDirective, ResourceDirective,
    ViewsDirective, ViewDirective, ResourceDetails, Inject, TimelineViews,
    Resize, DragAndDrop, Day, EventSettingsModel} from "@syncfusion/ej2-react-schedule"
import "./Calendar.css"


export default class Calendar extends Component {
    constructor(){
        super()
        this.Change = 0;
    }
    private employeeData: Object[] = [
        { Text: 'Alice', Id: 1, GroupId: 1, Color: 'rgb(49,48,135)', Designation: 'Content writer' },
        { Text: 'Nancy', Id: 2, GroupId: 2, Color: 'rgb(228,95,99)', Designation: 'Designer' },
        { Text: 'Robert', Id: 3, GroupId: 1, Color: 'rgb(49,48,135)', Designation: 'Software Engineer' },
        { Text: 'Robson', Id: 4, GroupId: 2, Color: 'rgb(228,95,99)', Designation: 'Support Engineer' },
        { Text: 'Laura', Id: 5, GroupId: 1, Color: 'rgb(49,48,135)', Designation: 'Human Resource' },
        { Text: 'Margaret', Id: 6, GroupId: 2, Color: 'rgb(228,95,99)', Designation: 'Content Analyst' }
    ];

    private getEmployeeName(value: ResourceDetails | TreeViewArgs): string {
        return (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string;
    }

    private getEmployeeImage(value: ResourceDetails): string {
        let resourceName: string = this.getEmployeeName(value);
        return resourceName.toLowerCase();
    }

    private getEmployeeDesignation(value: ResourceDetails): string {
        return (value as ResourceDetails).resourceData.Designation as string;
    }

    private resourceHeaderTemplate(props: any): JSX.Element {
        return (<div className="template-wrap"><div className="employee-category"><div className={"employee-image " + this.getEmployeeImage(props)}></div><div className="employee-name">
            {this.getEmployeeName(props)}</div><div className="employee-designation">{this.getEmployeeDesignation(props)}</div></div></div>);
    }
    private localData: EventSettingsModel ={
        dataSource:[{
            Subject: "Testing",
            Id: 2,
            StartTime: new Date(2018, 7, 1, 10, 11),
            EndTime: new Date(2018, 7, 1, 11, 0),
        }]
    }
    dataBound(args) {
        console.log(this.localData)
    }
    public render() {
        
        return (
            <div className="content-div">
               <div className='schedule-control-section'>
                <div className='col-lg-12 control-section'>
                    <div className='control-wrapper drag-sample-wrapper'>
                        <div className="schedule-container">
                            <ScheduleComponent cssClass='block-events' width='100%' height='560px' 
                                currentView='TimelineDay' resourceHeaderTemplate={this.resourceHeaderTemplate.bind(this)}
                                eventSettings={this.localData}
                                group={{ enableCompactView: false, resources: ['Employee'] }}
                                dataBound={this.dataBound.bind(this)}
                                startHour='08:00' endHour='19:00' 
                                >
                                <ResourcesDirective>
                                    <ResourceDirective field='EmployeeId' title='Employees' name='Employee' allowMultiple={true}
                                        dataSource={this.employeeData} textField='Text' idField='Id' colorField='Color'>
                                    </ResourceDirective>
                                </ResourcesDirective>
                                <ViewsDirective>
                                    <ViewDirective option='Day' />
                                    <ViewDirective option='TimelineDay' />
                                </ViewsDirective>
                                <Inject services={[Day, TimelineViews, Resize, DragAndDrop]} />
                            </ScheduleComponent>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
