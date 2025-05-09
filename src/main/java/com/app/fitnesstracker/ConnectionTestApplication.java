import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@SpringBootApplication
public class ConnectionTestApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConnectionTestApplication.class, args);
    }
}

@Component
class DatabaseConnectionTester implements CommandLineRunner {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) {
        System.out.println("Testing database connection...");

        // Method 1: Test using DataSource
        try (Connection connection = dataSource.getConnection()) {
            System.out.println("Connection established successfully!");
            System.out.println("Database: " + connection.getCatalog());
            System.out.println("Connection valid: " + !connection.isClosed());
        } catch (SQLException e) {
            System.err.println("Connection failed! Error message: " + e.getMessage());
            e.printStackTrace();
        }

        // Method 2: Test using JdbcTemplate
        try {
            String dbVersion = jdbcTemplate.queryForObject("SELECT version()", String.class);
            System.out.println("Connected to PostgreSQL version: " + dbVersion);

            // Test by querying for the list of tables
            System.out.println("\nDatabase tables:");
            jdbcTemplate.queryForList(
                    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
            ).forEach(row -> System.out.println(row.get("table_name")));

        } catch (Exception e) {
            System.err.println("Query execution failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}