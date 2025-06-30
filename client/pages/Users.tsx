import { useState } from "react";
import { UsersSidebar } from "@/components/users/UsersSidebar";
import { UsersHeader } from "@/components/users/UsersHeader";
import { UsersFilters } from "@/components/users/UsersFilters";
import { UsersTable } from "@/components/users/UsersTable";

export interface User {
  id: string;
  nom: string;
  prenoms: string;
  age: number;
  telephone: string;
  email: string;
  role?: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    nom: "ASSOBGA",
    prenoms: "Giles-Christ",
    age: 23,
    telephone: "0142011445",
    email: "pierre@example.com",
    role: "Utilisateur",
  },
  {
    id: "2",
    nom: "ASSOBGA",
    prenoms: "Giles-Christ",
    age: 23,
    telephone: "0142011445",
    email: "pierre@example.com",
    role: "Manager",
  },
  {
    id: "3",
    nom: "ASSOBGA",
    prenoms: "Giles-Christ",
    age: 23,
    telephone: "0142011445",
    email: "pierre@example.com",
    role: "Serveur",
  },
  {
    id: "4",
    nom: "ASSOBGA",
    prenoms: "Giles-Christ",
    age: 23,
    telephone: "0142011445",
    email: "pierre@example.com",
    role: "Cuisinier",
  },
];

export default function Users() {
  const [users] = useState<User[]>(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [selectedAge, setSelectedAge] = useState<string>("all");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterUsers(query, selectedRole, selectedAge);
  };

  const handleRoleFilter = (role: string) => {
    setSelectedRole(role);
    filterUsers(searchQuery, role, selectedAge);
  };

  const handleAgeFilter = (age: string) => {
    setSelectedAge(age);
    filterUsers(searchQuery, selectedRole, age);
  };

  const filterUsers = (query: string, role: string, age: string) => {
    let filtered = users;

    if (query) {
      filtered = filtered.filter(
        (user) =>
          user.nom.toLowerCase().includes(query.toLowerCase()) ||
          user.prenoms.toLowerCase().includes(query.toLowerCase()) ||
          user.role?.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (role !== "all") {
      filtered = filtered.filter((user) => user.role === role);
    }

    if (age !== "all") {
      // Simple age filtering logic - you can expand this
      const ageNum = parseInt(age);
      filtered = filtered.filter((user) => user.age === ageNum);
    }

    setFilteredUsers(filtered);
  };

  const handleUserAction = (
    action: "view" | "edit" | "delete",
    userId: string,
  ) => {
    console.log(`${action} user with ID: ${userId}`);
    // Implement action handlers here
  };

  return (
    <div className="min-h-screen bg-dashboard-gray flex">
      <UsersSidebar />

      <main className="flex-1 flex flex-col">
        <UsersHeader />

        <div className="flex-1 px-6 py-8">
          <h1 className="text-2xl font-bold text-dashboard-dark mb-8 font-poppins">
            Utilisateurs
          </h1>

          <UsersFilters
            searchQuery={searchQuery}
            selectedRole={selectedRole}
            selectedAge={selectedAge}
            totalUsers={users.length}
            onSearch={handleSearch}
            onRoleFilter={handleRoleFilter}
            onAgeFilter={handleAgeFilter}
          />

          <div className="mt-8">
            <UsersTable users={filteredUsers} onUserAction={handleUserAction} />
          </div>
        </div>
      </main>
    </div>
  );
}
