/**
 * Composant unifié pour les actions d'export de données
 * Assure la cohérence des exports dans tout le projet
 */

import React from "react";
import { Download, FileSpreadsheet, FileText, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useUnifiedNotifications } from "@/hooks/use-unified-notifications";
import { cn } from "@/lib/utils";

export type ExportFormat = "csv" | "excel" | "pdf" | "print";

interface ExportActionProps {
  onExport: (format: ExportFormat) => void | Promise<void>;
  dataType: string; // "commandes", "utilisateurs", "produits", etc.
  disabled?: boolean;
  loading?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "single" | "dropdown";
  defaultFormat?: ExportFormat;
  availableFormats?: ExportFormat[];
  className?: string;
}

const FORMAT_CONFIG = {
  csv: {
    label: "CSV",
    icon: FileText,
    description: "Données tabulaires",
  },
  excel: {
    label: "Excel",
    icon: FileSpreadsheet,
    description: "Classeur Excel",
  },
  pdf: {
    label: "PDF",
    icon: FileText,
    description: "Document PDF",
  },
  print: {
    label: "Imprimer",
    icon: Printer,
    description: "Impression directe",
  },
} as const;

const SIZE_CLASSES = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-1.5 text-sm",
  lg: "px-4 py-2 text-base",
};

const ICON_SIZES = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

export function ExportAction({
  onExport,
  dataType,
  disabled = false,
  loading = false,
  size = "md",
  variant = "single",
  defaultFormat = "excel",
  availableFormats = ["csv", "excel", "pdf"],
  className,
}: ExportActionProps) {
  const { notifications } = useUnifiedNotifications();
  const sizeClass = SIZE_CLASSES[size];
  const iconSize = ICON_SIZES[size];

  const handleExport = async (format: ExportFormat) => {
    if (loading || disabled) return;

    try {
      await onExport(format);
      notifications.dataExported(
        `${dataType} (${FORMAT_CONFIG[format].label})`,
      );
    } catch (error) {
      notifications.actionError(
        `Export ${dataType}`,
        `Erreur lors de l'export ${FORMAT_CONFIG[format].label}`,
      );
    }
  };

  // Variante simple - un seul bouton avec format par défaut
  if (variant === "single") {
    const formatConfig = FORMAT_CONFIG[defaultFormat];
    const IconComponent = formatConfig.icon;

    return (
      <Button
        variant="outline"
        onClick={() => handleExport(defaultFormat)}
        disabled={disabled || loading}
        className={cn(
          "bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100",
          "transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:ring-offset-1",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          sizeClass,
          "rounded-lg font-medium",
          className,
        )}
      >
        <IconComponent className={cn(iconSize, "mr-1.5")} />
        {loading ? "Export..." : `Exporter`}
      </Button>
    );
  }

  // Variante dropdown - choix de format
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled || loading}
          className={cn(
            "bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100",
            "transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:ring-offset-1",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            sizeClass,
            "rounded-lg font-medium",
            className,
          )}
        >
          <Download className={cn(iconSize, "mr-1.5")} />
          {loading ? "Export..." : "Exporter"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <div className="px-2 py-1.5 text-xs font-medium text-gray-500 border-b">
          Format d'export
        </div>
        {availableFormats.map((format) => {
          const formatConfig = FORMAT_CONFIG[format];
          const IconComponent = formatConfig.icon;

          return (
            <DropdownMenuItem
              key={format}
              onClick={() => handleExport(format)}
              disabled={loading}
              className="flex items-center gap-2 cursor-pointer"
            >
              <IconComponent className="w-4 h-4" />
              <div className="flex-1">
                <div className="font-medium">{formatConfig.label}</div>
                <div className="text-xs text-gray-500">
                  {formatConfig.description}
                </div>
              </div>
            </DropdownMenuItem>
          );
        })}

        {availableFormats.includes("print") && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleExport("print")}
              disabled={loading}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <div>
                <div className="font-medium">Imprimer</div>
                <div className="text-xs text-gray-500">Impression directe</div>
              </div>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Hook pour gérer les exports avec notifications automatiques
export function useExportActions(dataType: string) {
  const { notifications } = useUnifiedNotifications();

  const exportData = async (
    data: any[],
    format: ExportFormat,
    filename?: string,
  ) => {
    const baseFilename =
      filename || `${dataType}-${new Date().toISOString().split("T")[0]}`;

    try {
      switch (format) {
        case "csv":
          await exportToCSV(data, `${baseFilename}.csv`);
          break;
        case "excel":
          await exportToExcel(data, `${baseFilename}.xlsx`);
          break;
        case "pdf":
          await exportToPDF(data, `${baseFilename}.pdf`);
          break;
        case "print":
          await printData(data);
          break;
      }
    } catch (error) {
      throw new Error(`Erreur lors de l'export ${FORMAT_CONFIG[format].label}`);
    }
  };

  return { exportData };
}

// Fonctions d'export simplifiées (à implémenter selon vos besoins)
async function exportToCSV(data: any[], filename: string) {
  // Implémentation basique CSV
  const csvContent = convertToCSV(data);
  downloadFile(csvContent, filename, "text/csv");
}

async function exportToExcel(data: any[], filename: string) {
  // Vous pouvez utiliser une librairie comme xlsx
  console.log("Export Excel:", data, filename);
  // Simulation pour la démo
  await new Promise((resolve) => setTimeout(resolve, 1000));
}

async function exportToPDF(data: any[], filename: string) {
  // Vous pouvez utiliser une librairie comme jsPDF
  console.log("Export PDF:", data, filename);
  // Simulation pour la démo
  await new Promise((resolve) => setTimeout(resolve, 1000));
}

async function printData(data: any[]) {
  // Implémentation de l'impression
  window.print();
}

function convertToCSV(data: any[]): string {
  if (!data.length) return "";

  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header];
          return typeof value === "string" && value.includes(",")
            ? `"${value}"`
            : value;
        })
        .join(","),
    ),
  ];

  return csvRows.join("\n");
}

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
