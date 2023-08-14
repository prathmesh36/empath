package org.empath.repository;

import org.empath.model.db.Order;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends CrudRepository<Order, Integer> {

    @Query(value = "SELECT * FROM `ORDER` u", nativeQuery = true)
    List<Order> getAllOrders();

    @Query(value = "SELECT * FROM `ORDER` u WHERE u.ORDER_ID = :orderId", nativeQuery = true)
    Order getOrderByOrderId(@Param("orderId") String orderId);

    @Query(value = "SELECT * FROM `ORDER` u WHERE u.USER_ID = :userId", nativeQuery = true)
    List<Order> getOrderByUserId(@Param("userId") String userId);

    @Query(value = "SELECT * FROM `ORDER` u WHERE u.EXP_ID = :expId", nativeQuery = true)
    List<Order> getOrderByExpId(@Param("expId") String expId);

    @Modifying
    @Query(value = "DELETE FROM `ORDER` WHERE ORDER_ID = :orderId", nativeQuery = true)
    void deleteOrderByOrderId(@Param("orderId") String orderId);

    @Modifying
    @Query(value = "INSERT INTO `ORDER` (ORDER_ID, EXP_ID, USER_ID, TOTAL_COST, TOTAL_QUANTITY, ORDER_ADDRESS) VALUES(:orderId, :expId, :userId, :totalCost, :totalQuantity, :orderAddress)", nativeQuery = true)
    void addOrder(@Param("orderId") String orderId, @Param("expId") String expId, @Param("userId") String userId, @Param("totalCost") int totalCost, @Param("totalQuantity") int totalQuantity, @Param("orderAddress") String orderAddress);
}
