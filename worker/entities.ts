import { IndexedEntity } from "./core-utils";
import type { User, Brief } from "@shared/types";
import { MOCK_POSTS, MOCK_USERS } from "@shared/mock-data";
export class UserEntity extends IndexedEntity<User> {
  static readonly entityName = "user";
  static readonly indexName = "users";
  static readonly initialState: User = { id: "", name: "", email: "", tier: "Free" };
  static seedData = MOCK_USERS;
  static async findByEmail(env: any, email: string): Promise<User | null> {
    const all = await this.list(env);
    return all.items.find(u => u.email === email) ?? null;
  }
}
export class BriefEntity extends IndexedEntity<Brief> {
  static readonly entityName = "brief";
  static readonly indexName = "briefs";
  static readonly initialState: Brief = {
    id: "",
    slug: "",
    title: "",
    category: "Industry",
    summary: "",
    fullContent: "",
    isPremium: false,
    date: "",
    author: "",
    readTime: ""
  };
  static seedData = MOCK_POSTS;
  static async findBySlug(env: any, slug: string): Promise<Brief | null> {
    const all = await this.list(env);
    return all.items.find(b => b.slug === slug) ?? null;
  }
}