package com.rpl.server.repository;

import com.rpl.server.entity.Menu;
import com.rpl.server.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepository extends JpaRepository<Menu,Integer> {
}
