package net.mcrlab.linkedface.dao;

import net.mcrlab.linkedface.entity.User;
import org.springframework.stereotype.Repository;

@Repository("userDao")
public interface UserDao {
    void insert(User user);
    void delete(Integer id);
    void update(User user);
    User selectById(Integer id);
}
