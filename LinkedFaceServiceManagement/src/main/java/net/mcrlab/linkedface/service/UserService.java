package net.mcrlab.linkedface.service;

import net.mcrlab.linkedface.entity.User;

public interface UserService {
    void add(User user);
    void remove(Integer id);
    void edit(User user);
    User get(Integer id);
}
