package net.mcrlab.linkedface.service.impl;


import net.mcrlab.linkedface.dao.UserDao;
import net.mcrlab.linkedface.entity.User;
import net.mcrlab.linkedface.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("userService")
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;
    @Override
    public void add(User user) {
        user.setPassword("123456");
        userDao.insert(user);
    }

    @Override
    public void remove(Integer id) {
        userDao.delete(id);
    }

    @Override
    public void edit(User user) {
        userDao.update(user);
    }

    @Override
    public User get(Integer id) {
       return userDao.selectById(id);
    }
}
