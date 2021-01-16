package net.mcrlab.linkedface.service.impl;

import net.mcrlab.linkedface.dao.PersonDao;
import net.mcrlab.linkedface.entity.Person;
import net.mcrlab.linkedface.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("personService")
public class PersonServiceImpl implements PersonService {
    @Autowired
    private PersonDao personDao;

    @Override
    public void add(Person person) {
        personDao.insert(person);
    }

    @Override
    public void remove(Integer id) {
        personDao.delete(id);
    }

    @Override
    public void edit(Person person) {
        personDao.update(person);
    }

    @Override
    public Person get(Integer id) {
        return personDao.selectById(id);
    }

    @Override
    public List<Person> getAll() {
        return personDao.selectAll();
    }
}
