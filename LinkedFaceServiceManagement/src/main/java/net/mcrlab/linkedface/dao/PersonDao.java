package net.mcrlab.linkedface.dao;

import net.mcrlab.linkedface.entity.Person;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("personDao")
public interface PersonDao {
    void insert(Person person);
    void delete(Integer id);
    void update(Person person);
    Person selectById(Integer id);
    List<Person> selectAll();
}
