package com.example.app;

import android.text.format.Time;

import java.util.ArrayList;

/**
 * Created by leroy on 3-3-14.
 */
public class Task {
    private String name;
    private Time totalTime = new Time();

    public Task(String name) {
        this.name = name;
    }

    public String getTotalTimeString(){
        return ((totalTime.hour == 0) ? "00" : totalTime.hour) + ":" + ((totalTime.minute == 0) ? "00" : totalTime.minute);
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Time getTotalTime() {
        return totalTime;
    }
    public void setTotalTime(Time totalTime) {
        this.totalTime = totalTime;
    }
}
