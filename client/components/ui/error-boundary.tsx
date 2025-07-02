import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error Boundary caught an error:", error, errorInfo);

    // En mode développement, afficher plus d'informations
    if (import.meta.env.DEV) {
      console.group("Error Boundary Details");
      console.error("Error:", error);
      console.error("Error Info:", errorInfo);
      console.error("Component Stack:", errorInfo.componentStack);
      console.groupEnd();
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Une erreur s'est produite
            </h2>

            <p className="text-gray-600 mb-4">
              {import.meta.env.DEV
                ? `Erreur: ${this.state.error?.message || "Erreur inconnue"}`
                : "Une erreur inattendue s'est produite. Veuillez réessayer."}
            </p>

            {import.meta.env.DEV && this.state.error?.stack && (
              <details className="text-left bg-gray-100 p-3 rounded-md mb-4 text-xs">
                <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                  Détails de l'erreur (développement)
                </summary>
                <pre className="whitespace-pre-wrap text-gray-600 overflow-auto max-h-32">
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={this.handleReset}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Réessayer
              </Button>

              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Recharger la page
              </Button>
            </div>

            {import.meta.env.DEV && (
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-700">
                  <strong>Mode développement :</strong> Cette erreur peut être
                  due à l'indisponibilité de l'API Laravel. Vérifiez que le
                  backend est démarré sur le port 8000.
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook pour utiliser l'Error Boundary avec des fonctions
export function withErrorBoundary<T extends object>(
  Component: React.ComponentType<T>,
) {
  return function WrappedComponent(props: T) {
    return (
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
