package com.rinconperrito.backend.config;

import com.rinconperrito.backend.entity.Category;
import com.rinconperrito.backend.entity.Product;
import com.rinconperrito.backend.entity.User;
import com.rinconperrito.backend.repository.CategoryRepository;
import com.rinconperrito.backend.repository.ProductRepository;
import com.rinconperrito.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(CategoryRepository categoryRepository,
                           ProductRepository productRepository,
                           UserRepository userRepository,
                           PasswordEncoder passwordEncoder) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (categoryRepository.count() == 0) {
            categoryRepository.saveAll(List.of(
                new Category("camas", "Camas", "Camas cómodas, ortopédicas y térmicas para perritos"),
                new Category("juguetes", "Juguetes", "Mordedores, pelotas y juguetes interactivos"),
                new Category("collares", "Collares", "Collares ajustables, reflectantes y de paseo"),
                new Category("ofertas", "Ofertas Especiales", "Productos seleccionados con descuento exclusivo")
            ));
        }

        if (productRepository.count() == 0) {
            productRepository.saveAll(List.of(
                new Product("cama-madera", "CAM001", "Cama de Madera para Perrito",
                    "Cama de madera sólida con base firme para descanso ergonómico.",
                    14990, 11990, true, 12, 3, "camas", "Madera de Pino", "cama.png"),
                new Product("cama-tela", "CAM002", "Cama Cómoda Térmica",
                    "Cama suave con forro térmico especial para proteger del frío.",
                    19990, null, false, 8, 2, "camas", "Tela Acolchada", "camav2.png"),
                new Product("cama-pequena", "CAM003", "Cama Nido Compacta",
                    "Cama circular compacta ideal para cachorros y perros mini.",
                    12990, null, false, 15, 4, "camas", "Algodón Hipoalergénico", "camav3.png"),
                new Product("cama-acolchada", "CAM004", "Cama Acolchada Ortopédica",
                    "Colchón viscoelástico para aliviar articulaciones en perros senior.",
                    17990, 14990, true, 3, 5, "camas", "Memory Foam", "camav4.png"),
                new Product("juguete-plastico", "JUG001", "Hueso Interactivo Liviano",
                    "Hueso de goma no tóxica para ejercitar mandíbula y jugar a lanzar.",
                    3990, null, false, 25, 5, "juguetes", "Plástico libre de BPA", "juguetes.png"),
                new Product("juguete-mordedor", "JUG002", "Pelota Mordedora Dental",
                    "Relieves de goma que limpian suavemente encías y dientes.",
                    5990, 4490, true, 18, 4, "juguetes", "Goma TPR", "juguetesv2.png"),
                new Product("juguete-cuerda", "JUG003", "Cuerda Trenzada Resistente",
                    "Cuerda de algodón reforzado para jugar al tira y afloja.",
                    4990, null, false, 14, 5, "juguetes", "Algodón Natural", "juguetesv3.png"),
                new Product("juguete-caucho", "JUG004", "Kong de Caucho Ultra Durable",
                    "Caucho natural ultra resistente rellenable con comida o premios.",
                    6990, null, false, 2, 4, "juguetes", "Caucho Natural", "juguetesv4.png"),
                new Product("collar-clasico", "COL001", "Collar Clásico Reflectante",
                    "Nylon reforzado con costuras reflectantes para paseos nocturnos seguros.",
                    5990, null, false, 30, 5, "collares", "Nylon y Acero", "collar.png"),
                new Product("collar-ajustable", "COL002", "Collar Ajustable Soft Touch",
                    "Broche rápido antiahogo y textura acolchada que cuida el pelaje.",
                    7990, 5990, true, 11, 3, "collares", "Polímero Suave", "collarv2.png"),
                new Product("collar-resistente", "COL003", "Collar Aventura Outdoor",
                    "Totalmente impermeable y lavable, resistente al agua y barro.",
                    8990, null, false, 4, 5, "collares", "Biothane Impermeable", "collarv3.png"),
                new Product("collar-paseo", "COL004", "Collar de Paseo Urbano",
                    "Diseño liviano con estampados alegres para uso diario.",
                    6990, null, false, 16, 3, "collares", "Poliéster Reforzado", "collarv4.png")
            ));
        }

        if (userRepository.count() == 0) {
            userRepository.saveAll(List.of(
                new User("19011022K", "Administrador", "Principal Duoc", "admin@duocuc.cl",
                    passwordEncoder.encode("admin123"), "Administrador",
                    "Región Metropolitana de Santiago", "Santiago", "Av. España 123, Campus Duoc UC", "+56911223344"),
                new User("181234567", "Carlos", "Vendedor Duoc", "vendedor@duocuc.cl",
                    passwordEncoder.encode("vendedor123"), "Vendedor",
                    "Región de Valparaíso", "Viña del Mar", "Calle Valparaíso 456", "+56955667788"),
                new User("201112223", "María", "González Pérez", "cliente@gmail.com",
                    passwordEncoder.encode("cliente123"), "Cliente",
                    "Región Metropolitana de Santiago", "Providencia", "Av. Providencia 2020, Depto 402", "+56999887766")
            ));
        }
    }
}

