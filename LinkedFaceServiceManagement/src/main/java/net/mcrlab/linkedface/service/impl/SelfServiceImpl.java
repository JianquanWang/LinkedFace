package net.mcrlab.linkedface.service.impl;

import net.mcrlab.linkedface.dao.SelfDao;
import net.mcrlab.linkedface.dao.UserDao;
import net.mcrlab.linkedface.entity.User;
import net.mcrlab.linkedface.service.SelfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("selfService")
public class SelfServiceImpl implements SelfService {
    @Autowired
    private SelfDao selfDao;
    @Autowired
    private UserDao userDao;
    @Override
    public User login(String username, String password) {
        User user = selfDao.selectByAccount(username);
        if (user == null) return null;
        if (user.getPassword().equals(password)) return user;
        return null;
    }

    @Override
    public void changePassword(Integer id, String password) {
        User user = userDao.selectById(id);
        user.setPassword(password);
        userDao.update(user);
    }
}
