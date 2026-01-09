package pl.poznan.put.adhd.adhd_helper.pimpus.model;

public record ProfileDto(
        Integer level,
        Integer currentExp,
        Integer expToNextLevel,
        Integer inventoryPoints,
        String currentTitle,
        BossDto currentBoss) {}
