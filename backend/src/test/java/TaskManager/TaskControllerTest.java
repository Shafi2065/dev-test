package TaskManager;

import TaskManager.Controller.TaskController;
import TaskManager.Model.Task;
import TaskManager.Repository.TaskRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.springframework.http.MediaType;

@WebMvcTest(TaskController.class)
class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private TaskRepository taskRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void GetAllTasks() throws Exception {
        this.mockMvc.perform(get("/task/all"))
                .andExpect(status().isOk());
    }

    @Test
    void AddNewTask() throws Exception {
        Task newTask = new Task();
        newTask.setId(1L);
        newTask.setTitle("Test Task");
        newTask.setDescription("This is a valid description");
        newTask.setStatus("In Progress");
        newTask.setDueDate(LocalDateTime.now().plusDays(1));

        when(taskRepository.save(any(Task.class))).thenReturn(newTask);

        this.mockMvc.perform(post("/task/add")
                        .param("title", newTask.getTitle())
                        .param("description", newTask.getDescription())
                        .param("status", newTask.getStatus())
                        .param("dueDate", newTask.getDueDate().toString()))
                .andExpect(status().isOk())
                .andExpect(content().string("Saved"));
    }

    @Test
    void DeleteTask() throws Exception {
        Task taskToDelete = new Task();
        taskToDelete.setId(1L);
        taskToDelete.setTitle("Test Task");
        taskToDelete.setStatus("Completed");
        taskToDelete.setDueDate(LocalDateTime.now().plusDays(1));

        when(taskRepository.findById(1L)).thenReturn(Optional.of(taskToDelete));

        mockMvc.perform(delete("/task/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.title").value("Test Task"));
    }

    @Test
    void UpdateTaskStatus() throws Exception {
        // Existing task in DB
        Task taskToUpdate = new Task();
        taskToUpdate.setId(1L);
        taskToUpdate.setTitle("Test Task");
        taskToUpdate.setDescription("This is a valid description");
        taskToUpdate.setStatus("In Progress");
        taskToUpdate.setDueDate(LocalDateTime.now().plusDays(1));

        // Incoming task from request (just the updated status)
        Task incomingTask = new Task();
        incomingTask.setStatus("Completed");

        when(taskRepository.findById(1L)).thenReturn(Optional.of(taskToUpdate));
        when(taskRepository.save(any(Task.class))).thenReturn(taskToUpdate);

        mockMvc.perform(put("/task/1/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(incomingTask)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("Completed"));
    }

}

