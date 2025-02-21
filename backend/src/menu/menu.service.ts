import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

const prisma = new PrismaClient();

@Injectable()
export class MenuService {
  // Get all menus in a hierarchical structure
  async getMenus() {
    return prisma.menu.findMany({
      where: { parentId: null },
      include: {
        children: {
          include: {
            children: true,
          },
        },
      },
    });
  }

  // Get a single menu (with children)
  async getMenu(id: string) {
    return prisma.menu.findUnique({
      where: { id },
      include: {
        parent: true,
        children: {
          include: {
            children: true,
          },
        },
      },
    });
  }

  async createMenu(dto: CreateMenuDto) {
    return prisma.menu.create({
      data: {
        name: dto.name,
        parentId: dto.parentId || null,
      },
    });
  }

  async updateMenu(id: string, dto: UpdateMenuDto) {
    return prisma.menu.update({
      where: { id },
      data: {
        name: dto.name,
        parentId: dto.parentId || null,
      },
    });
  }

  async deleteMenu(id: string) {
    // Potentially handle recursive delete if needed
    return prisma.menu.delete({
      where: { id },
    });
  }
}
