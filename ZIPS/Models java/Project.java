package com.example.app;


import android.text.format.Time;

import java.io.Serializable;
import java.util.ArrayList;

/**
 * Created by leroy on 3-3-14.
 */
@SuppressWarnings("serial") //with this annotation we are going to hide compiler warning
public class Project{
    private String name;

    private ArrayList<Perform> performs = new ArrayList<Perform>();
    private ArrayList<Task> tasks = new ArrayList<Task>();

    public Project(String name){
        this.name = name;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Time getTotalTime() {
        Time totalTime = new Time();
        for (Task task : getTasks()) {
            totalTime.hour += task.getTotalTime().hour;
            //todo als grote is als 60
            totalTime.minute += task.getTotalTime().minute;
        }
        return totalTime;

    }

    public String getTotalTimeString(){
        Time totalTime = getTotalTime();
        return ((totalTime.hour == 0) ? "00" : totalTime.hour) + ":" + ((totalTime.minute == 0) ? "00" : totalTime.minute);
    }
    public ArrayList<Perform> getPerforms() {
        return performs;
    }
    public void addPerfrom(Perform perfrom){
        performs.add(perfrom);
    }
    public Perform getPerfrom(Time date){
        for (Perform perform : performs) {
            if(perform.getDate() == date){
                return perform;
            }
        }
        return null;
    }
    public boolean addTask(String taskName){
        Task task = tasksContains(taskName);
        if(task == null){
            Task newTask = new Task(taskName);
            tasks.add(newTask);
            return true;
        }
        return false;

    }
    public ArrayList<Task> getTasks(){
        for (Perform perform : performs) {
            String taskName = perform.getTaskName();
            if(!taskName.equals("")){
                if(tasksContains(taskName) == null){
                    Task newTask = new Task(taskName);
                    newTask.setTotalTime(perform.getTotalTime());
                    tasks.add(newTask);
                }else{
                    Task existTask = tasksContains(taskName);
                    Time existTaskTime = existTask.getTotalTime();
                    existTaskTime.hour += perform.getTotalTime().hour;
                    //todo als grote is als 60
                    existTaskTime.minute += perform.getTotalTime().minute;
                    existTask.setTotalTime(existTaskTime);
                }
            }
        }
        return tasks;
    }
    private Task tasksContains(String taskName){
        for(Task t :tasks){
            if(t.getName().equals(name)) return t;
        }
        return null;
    }
}
