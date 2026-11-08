import React from 'react';

export interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  override state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Uncaught error in React lifecycle:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public override render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="w-full min-h-screen bg-[#070A13] text-white flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain opacity-80" />
          </div>
          <h1 className="font-brand text-xl font-medium text-[#EBEBEB] mb-2 tracking-wide">
            页面遇到异常，请刷新重试
          </h1>
          <p className="text-sm text-white/40 max-w-md mb-6 leading-relaxed">
            应用在渲染时遇到未知错误，您可以尝试刷新页面恢复访问。
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            className="px-6 py-2.5 rounded-xl bg-white text-black font-medium text-sm transition-all hover:bg-white/90 active:scale-95 cursor-pointer shadow-lg"
          >
            刷新页面
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
