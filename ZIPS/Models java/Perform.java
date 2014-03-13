package com.example.app;

import android.text.format.Time;

/**
 * Created by leroy on 4-3-14.
 */
public class Perform {
    private Time date = new Time();
    private Time fromTime = new Time();
    private Time toTime = new Time();
    private Time pauseTime = new Time();
    private String comment;

    private String taskName;


    public String dateString(){
        return date.monthDay + "-" + date.month + "-" + date.year;
    }
    public String fromTimeString(){
        return ((fromTime.hour == 0) ? "00" : fromTime.hour) + ":" + ((fromTime.minute == 0) ? "00" : fromTime.minute);
    }
    public String toTimeString(){
        return ((toTime.hour == 0) ? "00" : toTime.hour) + ":" + ((toTime.minute == 0) ? "00" : toTime.minute);
    }
    public String pauseTimeString(){
        return ((pauseTime.hour == 0) ? "00" : pauseTime.hour) + ":" + ((pauseTime.minute == 0) ? "00" : pauseTime.minute);
    }
    public String getTotalTimeString(){
        Time totalTime = getTotalTime();
        return ((totalTime.hour == 0) ? "00" : totalTime.hour) + ":" + ((totalTime.minute == 0) ? "00" : totalTime.minute);
    }
    public Time getDate() {
        return date;
    }
    public void setDate(Time date) {
        this.date = date;
    }
    public Time getFromTime() {
        return fromTime;
    }
    public void setFromTime(Time fromTime) {
        this.fromTime = fromTime;
    }
    public Time getToTime() {
        return toTime;
    }
    public void setToTime(Time toTime) {
        this.toTime = toTime;
    }
    public Time getPauseTime() {
        return pauseTime;
    }
    public void setPauseTime(Time pauseTime) {
        this.pauseTime = pauseTime;
    }
    public Time getTotalTime() {
        Time totalTime = new Time();
        totalTime.hour = (toTime.hour - fromTime.hour) - pauseTime.hour;
        totalTime.minute = (toTime.minute - fromTime.minute) - pauseTime.minute;
        return totalTime;
    }
    public String getComment() {
        return comment;
    }
    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }
}
