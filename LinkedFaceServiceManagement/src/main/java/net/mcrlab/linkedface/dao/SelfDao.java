package net.mcrlab.linkedface.dao;

import net.mcrlab.linkedface.entity.User;
import org.springframework.stereotype.Repository;

@Repository("selfDao")
public interface SelfDao {
    User selectByAccount(String username);
}
