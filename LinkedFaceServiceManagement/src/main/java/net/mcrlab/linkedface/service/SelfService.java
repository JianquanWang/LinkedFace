package net.mcrlab.linkedface.service;

import net.mcrlab.linkedface.entity.User;

public interface SelfService {
    User login(String username, String password);
    void changePassword(Integer id, String password);
}
