package net.mcrlab.linkedface.service;

import net.mcrlab.linkedface.entity.Person;

import java.util.List;

public interface PersonService {
    void add(Person person);
    void remove(Integer id);
    void edit(Person person);
    Person get(Integer id);
    List<Person> getAll();
}
