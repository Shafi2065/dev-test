package TaskManager.Repository;

import TaskManager.Model.Task;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called TaskRepository
// CRUD refers Create, Read, Update, Delete

public interface TaskRepository extends CrudRepository<Task, Long> {

    List<Task> findByStatus(String status);
}