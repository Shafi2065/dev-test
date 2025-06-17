package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
public class Task {
    LocalDateTime now = LocalDateTime.now();
    // auto generates id
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String title;
    private String description;
    private String status;
    private LocalDateTime dueDate;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        if (title == null) {
            throw new NullPointerException("Title cannot be null");
        }
        this.title = title;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        if (description.length() < 10) {
            throw new IllegalArgumentException("Description needs to contain a minimum of 10 characters");
        }
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        if (status == null) {
            throw new NullPointerException("Status cannot be null");
        }

        status = status.trim(); // Clean input first

        if (status.equalsIgnoreCase("completed")) {
            this.status = "Completed";
        } else if (status.equalsIgnoreCase("In Progress")) {
            this.status = "In Progress";
        } else {
            throw new IllegalArgumentException("Invalid status value: " + status);
        }
    }


    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDateTime dueDate) {

        if (dueDate == null) {
            throw new NullPointerException("Due date cannot be null");
        }
        if (dueDate.isBefore(now)) {
            throw new IllegalArgumentException("Due date cannot be in the past");
        }

        this.dueDate = dueDate;
    }
}
