package com.turkcell.skillhub.controller;

import com.turkcell.skillhub.dto.response.CategoryDTO;
import com.turkcell.skillhub.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
@CrossOrigin
@Tag(name = "Eğitim Kategorileri", description = "Ders kategorilerini listeleme ve detay görüntüleme API'leri")
public class CategoryController {

    private final CategoryService categoryService;

    @Operation(
            summary = "Tüm Kategorileri Listele",
            description = "Sistemdeki tüm eğitim kategorilerini (Yapay Zeka, Web Geliştirme, vb.) döndürür."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Başarılı - Kategori listesi döndürüldü",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = CategoryDTO.class)
                    )
            )
    })
    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        List<CategoryDTO> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @Operation(
            summary = "Kategori Detayını Getir",
            description = "Belirli bir kategorinin detaylı bilgilerini döndürür."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Başarılı - Kategori detayı döndürüldü",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = CategoryDTO.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Kategori bulunamadı",
                    content = @Content
            )
    })
    @GetMapping("/{categoryId}")
    public ResponseEntity<CategoryDTO> getCategoryById(
            @Parameter(description = "Kategori ID'si (örn: C1, C2)", required = true)
            @PathVariable String categoryId) {
        CategoryDTO category = categoryService.getCategoryById(categoryId);
        return ResponseEntity.ok(category);
    }
}

